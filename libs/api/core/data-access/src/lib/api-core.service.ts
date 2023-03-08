import { Injectable, NotFoundException } from '@nestjs/common'
import { Identity, IdentityProvider, UserRole, UserStatus } from '@prisma/client'
import { ApiConfigDataAccessService } from '@pubkeyapp/api/config/data-access'
import { GumSdk } from '@pubkeyapp/gum-sdk'

import { convertCoreDbUser, CoreDbUser, CoreUser } from './api-core.helpers'
import { ApiCoreCacheService } from './cache/api-core-cache.service'
import { ApiCoreDataService } from './data/api-core-data.service'

@Injectable()
export class ApiCoreService {
  readonly gum = new GumSdk({ endpoint: process.env.GUM_ENDPOINT })
  constructor(
    readonly cache: ApiCoreCacheService,
    readonly config: ApiConfigDataAccessService,
    readonly data: ApiCoreDataService,
  ) {}

  uptime() {
    return process.uptime()
  }

  async getUserRole(userId): Promise<UserRole> {
    return this.cache.wrap<UserRole>(
      'user',
      `${userId}:role`,
      async () => {
        const found = await this.data.user.findFirst({ where: { id: userId } })

        return found?.role
      },
      60,
    )
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

  getUserById(userId: string): Promise<CoreUser> {
    if (!userId) {
      return Promise.reject("Can't get user without id")
    }
    return this.cache.wrap<CoreUser>(
      'user',
      `get-by-id:${userId}`,
      () =>
        this.data.user
          .findUnique({
            where: { id: userId },
            include: { identities: true },
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
            include: { identities: true },
          })
          .then((user: CoreDbUser) => (user ? convertCoreDbUser(user, this.config.apiUrl) : undefined)),
      10,
    )
  }
}
