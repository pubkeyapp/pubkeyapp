import { Injectable, Logger, NotFoundException, OnApplicationBootstrap } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Identity, IdentityProvider, UserRole, UserStatus } from '@prisma/client'
import { ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { GumSdk } from '@pubkeyapp/gum-sdk'
import { convertCoreDbUser, CoreDbUser, CoreUser } from './api-core.helpers'
import { ApiCoreCacheService } from './cache/api-core-cache.service'
import { ApiCoreDataService } from './data/api-core-data.service'
import { ApiCoreSettingsService } from './settings/api-core-settings.service'

@Injectable()
export class ApiCoreService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ApiCoreService.name)
  readonly gum = new GumSdk({ endpoint: process.env.GUM_ENDPOINT })
  constructor(
    readonly cache: ApiCoreCacheService,
    readonly config: ApiConfigService,
    readonly data: ApiCoreDataService,
    private eventEmitter: EventEmitter2,
    readonly settings: ApiCoreSettingsService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.verbose('  => BOOTSTRAPPING CORE')
    await this.provisionSettings()
    setTimeout(() => this.reload(), 1000)
  }

  async ensureUser(userId: string): Promise<CoreUser> {
    const user = await this.getUserById(userId)

    if (!user) {
      throw new Error('Unauthorized: No such user')
    }
    return user
  }

  async ensureUserActive(userId: string): Promise<CoreUser> {
    const user = await this.ensureUser(userId)

    if (user.status !== UserStatus.Active) {
      throw new Error('Unauthorized: Not an active user')
    }
    return user
  }

  async ensureUserAdmin(userId: string): Promise<CoreUser> {
    const user = await this.ensureUserActive(userId)

    if (user.role !== UserRole.Admin) {
      throw new Error('Unauthorized: Not an admin')
    }
    return user
  }

  async ensureUsername(username: string) {
    const user = await this.data.findUserByUsername(username)

    if (!user) {
      throw new NotFoundException(`User ${username} not found`)
    }
    return user
  }

  async getUserById(userId: string, refresh = false): Promise<CoreUser> {
    if (!userId) {
      return Promise.reject("Can't get user without id")
    }
    const key = `get-by-id:${userId}`
    if (refresh) {
      await this.cache.del('user', key)
    }
    return this.cache.wrap<CoreUser>(
      'user',
      `get-by-id:${userId}`,
      () =>
        this.data.user
          .findUnique({
            where: { id: userId },
            include: { profile: true, profiles: true, identities: true },
          })
          .then((user: CoreDbUser) => (user ? convertCoreDbUser(user, this.config.apiUrl) : undefined)),
      10,
    )
  }

  getUserByIdentity(provider: IdentityProvider, providerId: string) {
    if (Object.keys(IdentityProvider).indexOf(provider) === -1) {
      return Promise.reject('Invalid provider')
    }
    if (!providerId) {
      return Promise.reject("Can't get user without providerId")
    }
    return this.cache.wrap<CoreUser>(
      'user',
      `get-by-identity:${provider}:${providerId}`,
      () =>
        this.data.identity
          .findUnique({
            where: { provider_providerId: { provider, providerId } },
          })
          .then((identity: Identity) => (identity ? this.getUserById(identity.ownerId) : undefined)),
      10,
    )
  }

  getUserByUsername(username: string): Promise<CoreUser> {
    if (!username) {
      return Promise.reject("Can't get user without username")
    }
    return this.cache.wrap<CoreUser>(
      'user',
      `get-by-username:${username}`,
      () =>
        this.data.user
          .findUnique({
            where: { username },
            include: { profile: true, profiles: true, identities: true },
          })
          .then((user: CoreDbUser) => (user ? convertCoreDbUser(user, this.config.apiUrl) : undefined)),
      10,
    )
  }

  private async loadSettings() {
    return this.data.setting.findMany({ orderBy: { key: 'asc' } }).then(async (res) => {
      const keys = this.config.settings.keys

      const invalid = res.filter((s) => !keys.includes(s.key))
      for (const item of invalid) {
        this.logger.warn(` => Deleting unknown setting ${item.key} => ${item.value} (default: ${item.default})`)
        await this.data.setting.delete({ where: { key: item.key } })
      }

      const valid = res.filter((s) => keys.includes(s.key))
      this.logger.verbose(`Loading ${valid.length} settings`)
      this.config.settings.clear()
      valid.forEach((setting) => {
        this.logger.verbose(` => Loaded setting ${setting.key} => ${setting.value} (default: ${setting.default})`)
        this.config.settings.set(setting)
      })
      return res
    })
  }

  private async provisionSettings() {
    for (const setting of this.config.settings.provisioned) {
      const existing = await this.data.setting.findFirst({ where: { key: setting.key } })
      if (existing && existing.description === setting.description && existing.default === setting.default) {
        this.logger.verbose(`Setting ${setting.key} already exists`)
        continue
      }
      await this.data.setting.upsert({
        where: { key: setting.key },
        update: {
          description: setting.description,
          default: setting.default,
        },
        create: setting,
      })
    }
    await this.loadSettings()
    this.logger.verbose('Settings provisioned, emitting reload event')
  }

  private reload() {
    this.eventEmitter.emit('core:reload', {
      settings: this.config.settings.values,
    })
  }

  uptime() {
    return process.uptime()
  }

  adminGetSettings(user: CoreUser) {
    if (user.role !== UserRole.Admin) {
      throw new Error('Unauthorized')
    }
    return this.data.setting.findMany({ orderBy: { key: 'asc' } })
  }

  adminSetSetting(user: CoreUser, key: string, value: string) {
    if (user.role !== UserRole.Admin) {
      throw new Error('Unauthorized')
    }
    return this.data.setting.update({ where: { key }, data: { value } }).then((res) => {
      this.logger.verbose(` => Updated setting ${key} => ${value} (user: ${user.id})`)
      this.config.settings.set({ key, value })
      this.reload()
      return res
    })
  }

  async userDeleteIdentity(userId: string, identityId: string) {
    const user = await this.ensureUserActive(userId)
    const identity = await this.data.identity.findUnique({ where: { id: identityId } })
    if (!identity) {
      throw new Error('Identity not found')
    }
    if (identity.ownerId !== user.id) {
      throw new Error('Unauthorized')
    }
    await this.data.identity.delete({ where: { id: identityId } })
    this.logger.verbose(` => Deleted identity ${identityId} (user: ${user.id})`)
    return this.getUserById(user.id, true)
  }
}
