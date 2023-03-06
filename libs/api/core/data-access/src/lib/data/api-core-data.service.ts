import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { IdentityProvider, PrismaClient, UserRole } from '@prisma/client'
import { ApiConfigDataAccessService } from '@pubkeyapp/api/config/data-access'
import { convertCoreDbUser, CoreUser, ellipsify } from '../api-core.helpers'

@Injectable()
export class ApiCoreDataService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataService.name)

  constructor(private readonly config: ApiConfigDataAccessService) {
    super()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async onModuleInit() {
    await this.$connect()
    await this.provisionUses()
    this.user.findMany().then(async (users) => {
      for (const user of users) {
        if (user.username.length > 30) {
          this.logger.warn(`User ${user.username} has a username longer than 30 characters`)
          const updated = await this.user.update({
            where: { id: user.id },
            data: { username: shortenUsername(user.username) },
          })
          console.log(`Updated ${user.username} to ${updated.username}`)
        }
      }
    })
  }

  findUserByUsername(username: string) {
    return this.user.findUnique({ where: { username }, include: { identities: true } })
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
      publicKeys.map(async (publicKey) => {
        const created = await this.createUser(role, publicKey)
        if (created) {
          this.logger.verbose(`Created ${created.role} ${created.username}`)
        }
        return created
      }),
    )
  }

  async createUser(role: UserRole, publicKey: string) {
    const found = await this.findUserByIdentity({ provider: 'Solana', providerId: publicKey })
    if (found) {
      this.logger.verbose(`Found ${found.role} ${found.username}`)
      return
    }

    return this.user.create({
      data: {
        username: shortenUsername(publicKey),
        role,
        identities: {
          create: {
            provider: 'Solana',
            providerId: publicKey,
          },
        },
      },
    })
  }
}

export function shortenUsername(name: string) {
  if (name.length > 30) {
    return ellipsify(name, 10)
  }
  return name
}
