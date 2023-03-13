import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { PublicKey } from '@solana/web3.js'
import { ApiAnonAccountService } from './api-anon-account.service'
import { AdminGetAccountsInput } from './dto/admin-get-accounts.input'

@Injectable()
export class ApiAdminAccountService {
  private readonly logger = new Logger(ApiAdminAccountService.name)
  constructor(private readonly anon: ApiAnonAccountService, private readonly core: ApiCoreService) {}

  async adminGetAccounts(adminId: string, input: AdminGetAccountsInput) {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.account.findMany({
      where: Object.keys(input).length
        ? {
            OR: [
              { network: input.network },
              { name: { contains: input.name } },
              { program: { contains: input.program } },
              { address: { contains: input.address } },
              { type: input.type },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        discoveredBy: { include: { profile: true } },
        owner: true,
        tokens: true,
        identity: {
          include: {
            owner: true,
          },
        },
      },
    })
  }

  async adminGetAccount(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)

    const account = await this.core.data.account.findUnique({
      where: {
        id,
      },
      include: {
        discoveredBy: { include: { profile: true } },
        owner: true,
        tokens: true,
        identity: {
          include: {
            owner: true,
          },
        },
        gumProfile: true,
        gumProfileMeta: true,
        gumUser: true,
      },
    })

    if (!account) {
      throw new NotFoundException()
    }

    return account
  }

  async adminDeleteAccount(adminId: string, accountId: string) {
    await this.core.ensureUserAdmin(adminId)

    try {
      await this.core.data.account.delete({ where: { id: accountId } })
      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  async adminIndexGumAccounts(userId: string) {
    await this.core.ensureUserAdmin(userId)
    const solanaIdentities = await this.core.data.identity.findMany({
      where: {
        provider: IdentityProvider.Solana,
      },
    })
    for (const solanaIdentity of solanaIdentities) {
      try {
        const gumAccount = await this.core.gum.sdk.user.getUser(new PublicKey(solanaIdentity.providerId))
        if (gumAccount) {
          console.log('gumAccount', gumAccount)
          // Check if we have profiles
          const gumProfiles = await this.core.gum.sdk.profile.getProfilesByUser(
            new PublicKey(solanaIdentity.providerId),
          )
          console.log('gumProfiles', gumProfiles)
        }
      } catch (e) {
        this.logger.error(e)
      }
    }
    // const allUserAccounts = await this.core.gum.sdk.user.getAllUsersAccounts()
    // for (const user of allUserAccounts) {
    //   console.log(user)
    // }
    return {
      hi: 'hi',
    }
  }
}
