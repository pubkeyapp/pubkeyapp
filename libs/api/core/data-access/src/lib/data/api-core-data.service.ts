import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { IdentityProvider, Prisma, PrismaClient, UserRole, UserStatus } from '@prisma/client'
import { ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { convertCoreDbUser, CoreDbUser, CoreUser, getUsername } from '../api-core.helpers'

@Injectable()
export class ApiCoreDataService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataService.name)

  constructor(private readonly config: ApiConfigService) {
    super()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async onModuleInit() {
    await this.$connect()
    await this.provisionUses()
  }

  findUserByUsername(username: string) {
    return this.user
      .findFirst({
        where: { username: { equals: username, mode: 'insensitive' } },
        include: { profile: true, profiles: true, identities: true, gumUser: true },
      })
      .then((user: CoreDbUser) => (user ? convertCoreDbUser(user) : undefined))
  }

  async findUserByIdentity({
    provider,
    providerId,
  }: {
    provider: IdentityProvider
    providerId: string
  }): Promise<CoreUser> {
    const found = await this.identity.findUnique({
      where: { provider_providerId: { provider, providerId } },
    })
    if (!found) {
      return null
    }
    return this.user
      .findUnique({
        where: { id: found.ownerId },
        include: { profile: true, profiles: true, identities: true, gumUser: true },
      })
      .then((user) => (user ? convertCoreDbUser(user) : null))
  }

  findUsers() {
    return this.user.findMany()
  }

  private async provisionUses() {
    const admins = this.config.provisionAdminPublicKeys()
    const users = this.config.provisionUserPublicKeys()

    if (admins.length === 0 && users.length === 0) {
      this.logger.warn('No users provisioned. Please set ADMIN_PUBLIC_KEYS or USER_PUBLIC_KEYS')
      return
    }

    await this.createUsers(UserRole.Admin, admins)
    await this.createUsers(UserRole.User, users)
  }

  createUsers(role: UserRole, publicKeys: string[]) {
    return Promise.all(
      publicKeys.map(async (publicKey, index) => {
        const created = await this.createUserWithSolanaIdentity(role, UserStatus.Active, publicKey, index)
        if (created) {
          this.logger.verbose(`Created ${created.role} ${created.username}`)
        }
        return created
      }),
    )
  }

  async createUserWithSolanaIdentity(role: UserRole, status: UserStatus, publicKey: string, pid?: number) {
    const found = await this.findUserByIdentity({ provider: 'Solana', providerId: publicKey })
    if (found) {
      this.logger.verbose(`Found ${found.role} ${found.username}`)
      return
    }

    return this.createUserWithIdentity(role, status, getUsername(publicKey), publicKey, pid, {
      provider: 'Solana',
      providerId: publicKey,
    })
  }

  async createUserWithIdentity(
    role: UserRole,
    status: UserStatus,
    username: string,
    publicKey: string,
    pid?: number,
    identity?: Prisma.IdentityCreateWithoutOwnerInput,
  ) {
    const existing = await this.findUserByUsername(username)
    if (existing) {
      username = `${identity.provider}-${identity.providerId}`
    }
    return this.user.create({
      data: {
        publicKey,
        pid: pid ?? undefined,
        role,
        status,
        username,
        identities: {
          create: identity,
        },
      },
    })
  }
}
