import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, NetworkType } from '@prisma/client'
import { ApiAnonAccountService } from '@pubkeyapp/api/account/data-access'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'

@Injectable()
export class ApiUserIdentityService {
  private readonly logger = new Logger(ApiUserIdentityService.name)
  constructor(readonly account: ApiAnonAccountService, readonly core: ApiCoreService) {}

  async userDeleteIdentity(userId: string, identityId: string) {
    const identity = await this.ensureIdentityOwner(userId, identityId)
    if (identity.provider === IdentityProvider.Solana) {
      throw new Error('Cannot delete Solana identity')
    }
    await this.core.data.identity.delete({ where: { id: identityId } })
    this.logger.verbose(` => Deleted identity ${identityId} (user: ${userId})`)
    return this.core.getUserById(userId, true)
  }

  async userSyncIdentity(userId: string, identityId: string) {
    const identity = await this.ensureIdentityOwner(userId, identityId)
    if (identity.provider !== IdentityProvider.Solana) {
      // FIXME: Support syncing profile data from other providers
      return identity
    }
    try {
      this.logger.verbose(`Syncing identity ${identityId} (user: ${userId}) (mainnet) ${identity.providerId}`)
      await this.account.userGetAccount(userId, NetworkType.SolanaMainnet, identity.providerId, true, identityId)
    } catch (e) {
      console.log('e', e)
    }
    try {
      this.logger.verbose(`Syncing identity ${identityId} (user: ${userId}) (devnet) ${identity.providerId}`)
      await this.account.userGetAccount(userId, NetworkType.SolanaDevnet, identity.providerId, true, identityId)
    } catch (e) {
      console.log('e', e)
    }

    return this.userGetIdentity(userId, identityId)
  }

  async userGetIdentities(userId: string) {
    await this.core.ensureUserActive(userId)
    return this.core.data.identity.findMany({
      where: { ownerId: userId },
      include: {
        profiles: true,
        accounts: true,
      },
    })
  }

  async userGetIdentity(userId: string, identityId: string) {
    await this.ensureIdentityOwner(userId, identityId)
    return this.core.data.identity.findUnique({
      where: { id: identityId },
      include: {
        owner: true,
        profiles: true,
        accounts: true,
      },
    })
  }

  private async ensureIdentityOwner(userId: string, identityId: string) {
    await this.core.ensureUserActive(userId)
    const identity = await this.core.data.identity.findUnique({
      where: { id: identityId },
      include: {
        owner: true,
        profiles: true,
        accounts: true,
      },
    })
    if (!identity) {
      throw new Error('Identity not found')
    }
    if (identity.ownerId !== userId) {
      throw new Error('Identity does not belong to user')
    }
    return identity
  }

  async userLinkIdentity(userId: string, provider: IdentityProvider, providerId: string) {
    await this.core.ensureUserActive(userId)
    if (provider !== IdentityProvider.Solana) {
      throw new Error(`Provider ${provider} not supported`)
    }
    await this.core.data.identity.create({
      data: {
        provider,
        providerId,
        ownerId: userId,
        verified: false,
      },
    })
    return this.core.getUserById(userId, true)
  }
}
