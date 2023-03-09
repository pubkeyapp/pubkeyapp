import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { IdentityProvider, Prisma, PrismaClient, UserRole, UserStatus } from '@prisma/client'
import { ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { getSolanaName } from 'sol-namor/src'
import { convertCoreDbUser, CoreUser } from '../api-core.helpers'

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
    // FIXME: Add caching
    return this.user
      .findUnique({ where: { username }, include: { identities: true } })
      .then((user) => (user ? convertCoreDbUser(user, this.config.apiUrl) : null))
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
      .findUnique({ where: { id: found.ownerId }, include: { identities: true } })
      .then((user) => (user ? convertCoreDbUser(user, this.config.apiUrl) : null))
  }

  findUsers() {
    return this.user.findMany()
  }

  findUserById(userId: string) {
    return this.user.findUnique({ where: { id: userId }, include: { identities: true } })
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

    return this.createUserWithIdentity(role, status, getUsername(publicKey), pid, {
      provider: 'Solana',
      providerId: publicKey,
    })
  }

  async createUserWithIdentity(
    role: UserRole,
    status: UserStatus,
    username: string,
    pid?: number,
    identity?: Prisma.IdentityCreateWithoutOwnerInput,
  ) {
    const existing = await this.findUserByUsername(username)
    if (existing) {
      username = `${identity.provider}-${identity.providerId}`
    }
    return this.user.create({
      data: {
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

export function getUsername(name: string) {
  if (name.length > 30) {
    const newName = getSolanaName(name)
    // slugify the name
    return newName
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
  }
  return name
}
