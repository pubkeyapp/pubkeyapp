import { AtpAgent } from '@atproto/api'
import { Injectable, Logger, NotFoundException, OnApplicationBootstrap } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Identity, IdentityProvider, UserRole, UserStatus } from '@prisma/client'
import { ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { GumSdk } from '@pubkeyapp/api/gum/data-access'
import { readFile } from 'fs-extra'
import { Client as Typesense } from 'typesense'
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections'
import { convertCoreDbUser, CoreDbUser, CoreUser } from './api-core.helpers'
import { ApiCoreCacheService } from './cache/api-core-cache.service'
import { ApiCoreDataService } from './data/api-core-data.service'
import { ApiCoreQueueService } from './queue/api-core-queue.service'
import { ApiCoreSettingsService } from './settings/api-core-settings.service'

@Injectable()
export class ApiCoreService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ApiCoreService.name)
  readonly atp = new AtpAgent({ service: process.env.ATP_ENDPOINT })
  readonly bsky = this.atp.api.app.bsky
  readonly gum = new GumSdk({ endpoint: process.env.GUM_ENDPOINT })
  readonly typesense = new Typesense({
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: parseInt(process.env.TYPESENSE_PORT, 10),
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_API_KEY,
    connectionTimeoutSeconds: 2,
  })

  constructor(
    readonly cache: ApiCoreCacheService,
    readonly config: ApiConfigService,
    readonly data: ApiCoreDataService,
    private eventEmitter: EventEmitter2,
    readonly queue: ApiCoreQueueService,
    readonly settings: ApiCoreSettingsService,
  ) {
    setTimeout(async () => {
      // await this.createSchema()
      // await this.importBooks()

      let searchParameters = {
        q: 'harry potter',
        query_by: 'title',
        sort_by: 'ratings_count:desc',
      }

      this.typesense
        .collections('books')
        .documents()
        .search(searchParameters)
        .then(function (searchResults) {
          // console.log(searchResults)
          for (const hit of searchResults?.hits) {
            console.log(`hit`, JSON.stringify(hit, null, 2))
          }
        })
    }, 3000)
  }

  async importBooks() {
    const booksInJsonl = await readFile(`${process.cwd()}/tmp/books.jsonl`)
    await this.typesense
      .collections('books')
      .documents()
      .import(booksInJsonl.toString())
      .then((res) => {
        console.log('res', res)
      })
  }
  async createSchema() {
    await this.typesense.collections('books').delete()
    const bookSchema: CollectionCreateSchema = {
      name: 'books',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'authors', type: 'string[]', facet: true },
        { name: 'publication_year', type: 'int32', facet: true },
        { name: 'ratings_count', type: 'int32' },
        { name: 'average_rating', type: 'float' },
      ],
      default_sorting_field: 'ratings_count',
    }
    this.typesense
      .collections()
      .create(bookSchema)
      .then((res) => {
        console.log('Created collection', res)
      })
  }

  async onApplicationBootstrap(): Promise<void> {
    this.logger.verbose('  => BOOTSTRAPPING CORE')
    await this.provisionSettings()
    setTimeout(() => {
      this.reload()
    }, 1000)
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
    const user = await this.getUserByUsername(username)

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
      key,
      () =>
        this.data.user
          .findUnique({
            where: { id: userId },
            include: {
              profile: {
                include: {
                  gumProfile: true,
                  identities: true,
                  owner: { include: { gumUser: true } },
                },
              },
              profiles: true,
              identities: true,
              gumUser: { include: { gumUser: true } },
            },
          })
          .then((user: CoreDbUser) => (user ? convertCoreDbUser(user) : undefined)),
      10,
    )
  }

  async getUserByPid(pid: number, refresh = false): Promise<CoreUser> {
    if (!pid) {
      return Promise.reject("Can't get user without pid")
    }
    parseInt(pid.toString(), 10)
    const key = `get-by-pid:${pid}`
    if (refresh) {
      await this.cache.del('user', key)
    }
    return this.cache.wrap<CoreUser>(
      'user',
      key,
      () =>
        this.data.user
          .findUnique({
            where: { pid },
            include: {
              profile: {
                include: {
                  gumProfile: true,
                  identities: true,
                  owner: { include: { gumUser: true } },
                },
              },
              profiles: true,
              identities: true,
              gumUser: { include: { gumUser: true } },
            },
          })
          .then((user: CoreDbUser) => (user ? convertCoreDbUser(user) : undefined)),
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
      () => this.data.findUserByUsername(username),
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

  async getAtpSession() {
    const session = await this.cache.wrap('atp', 'session', async () => {
      const result = await this.atp.login({
        identifier: this.config.aptIdentifier,
        password: this.config.aptPassword,
      })

      if (!result.success) {
        this.logger.verbose(`Failed to login to ATP: ${result}`)
        throw new Error('Failed to login to ATP')
      }
      return result.data
    })

    return this.atp.resumeSession(session)
  }
}
