import { Injectable, Logger } from '@nestjs/common'
import { Identity, IdentityProvider, NetworkType } from '@prisma/client'
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
    if (identity.provider === IdentityProvider.Atp) {
      return this.userSyncIdentityAtp(userId, identityId, identity)
    }
    if (identity.provider === IdentityProvider.Solana) {
      return this.userSyncIdentitySolana(userId, identityId, identity)
    }
    return identity
  }

  private async userSyncIdentityAtp(userId: string, identityId: string, identity: Identity) {
    await this.core.getAtpSession()

    const response = await this.core.bsky.actor.getProfile({ actor: identity.providerId })

    if (!response.success) {
      this.logger.warn(` => Failed to sync identity ${identityId} (user: ${userId}) (atp) ${identity.providerId}`)
      return
    }

    await this.core.data.identity.update({
      where: { id: identityId },
      data: {
        profile: JSON.parse(JSON.stringify(response.data)),
      },
    })

    return this.userGetIdentity(userId, identityId)
  }

  private async userSyncIdentitySolana(userId: string, identityId: string, identity: Identity) {
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
    if (provider !== IdentityProvider.Atp && provider !== IdentityProvider.Solana) {
      throw new Error(`Provider ${provider} not supported`)
    }

    const exists = await this.core.data.identity.findFirst({
      where: { provider, providerId },
    })
    if (exists) {
      throw new Error('Identity already linked')
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
