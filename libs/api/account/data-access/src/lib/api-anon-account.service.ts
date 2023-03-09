import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { AccountType, IdentityProvider, NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'
import { ApiAccountQueueService } from './queue/api-account-queue.service'

export const BLOCKED_ACCOUNTS = [
  // These are accounts that won't be found
  'NativeLoader1111111111111111111111111111111',
]

@Injectable()
export class ApiAnonAccountService implements OnModuleInit {
  private readonly logger = new Logger(ApiAnonAccountService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly solana: ApiSolanaService,
    private readonly queue: ApiAccountQueueService,
  ) {
    // this.core.data.account.deleteMany().then((res) => {
    //   console.log('Deleted all accounts', res)
    // })
  }

  async onModuleInit() {
    // this.core.gum.sdk.user.getAllUsersAccounts().then((res) => {
    //   console.log('All accounts', JSON.stringify(res, null, 2))
    // })
  }

  async getAccount(userId: string, network: NetworkType, address: string, sync = false) {
    if (sync) {
      await this.queue.processAccountDiscover({
        userId,
        address,
        network,
      })
    }

    await this.core.ensureUserActive(userId)
    if (BLOCKED_ACCOUNTS.includes(address)) {
      throw new NotFoundException(`Account ${address} not found on ${network} `)
    }

    let found = await this.findAccount(network, address)

    if (!found) {
      console.log('Account not found, trying to discover')
      found = await this.discoverAccount(userId, network, address, undefined, undefined, undefined, true)
    }
    if (!found) {
      throw new NotFoundException(`Account ${address} not found on ${network} `)
    }

    if (sync) {
      await this.lookupIntegrations({
        userId,
        address,
        identityId: found.identityId,
      })
    }

    return found
  }

  private async discoverAccount(
    userId: string,
    network: NetworkType,
    address: string,
    type?: AccountType,
    name?: string,
    identityId?: string,
    deep = false,
  ) {
    if (BLOCKED_ACCOUNTS.includes(address)) {
      this.logger.warn(`Account ${address} not index on ${network} (Blocked)`)
      return
    }
    this.logger.verbose(`Discovering account ${address} on ${network}`)
    const solana = this.solana.getSolanaNetwork(network)
    const accountInfo = await solana.getAccountInfo(address)

    if (
      !accountInfo.isMint &&
      !accountInfo.isOwner &&
      !accountInfo.isSystemAccount &&
      !accountInfo.isTokenAccount &&
      !accountInfo.program
    ) {
      console.log('Account not found', address, accountInfo)
      throw new NotFoundException(`Account ${address} not found on ${network} `)
    }
    let foundOwner
    if (accountInfo.program) {
      this.logger.verbose(`Account ${address} is owned by ${accountInfo.program?.toString()}`)
      foundOwner = await this.core.data.account.findFirst({
        where: {
          network,
          address: accountInfo.program?.toString(),
        },
      })

      if (!foundOwner) {
        // Index the owner
        this.logger.log(`Indexing owner ${accountInfo.program?.toString()}`)
        foundOwner = await this.discoverAccount(userId, network, accountInfo.program?.toString()).catch((e) =>
          this.logger.error('Error indexing owner', e),
        )
      }
    }

    const identity = await this.core.data.identity.findUnique({
      where: {
        provider_providerId: {
          provider: IdentityProvider.Solana,
          providerId: address,
        },
      },
    })

    type = type ?? AccountType.System

    if (accountInfo.isMint) {
      type = AccountType.Mint
    }
    if (accountInfo.isTokenAccount) {
      type = AccountType.Token
    }

    const exists = await this.findAccount(network, address)
    if (exists) {
      this.logger.log(`Account ${address} already exists`)
      return exists
    }
    await this.core.data.account.create({
      data: {
        discoveredBy: { connect: { id: userId } },
        discoveredAt: new Date(),
        network,
        identity: identityId ?? identity ? { connect: { id: identityId ?? identity.id } } : undefined,
        owner: foundOwner ? { connect: { id: foundOwner.id } } : undefined,
        program: accountInfo.program,
        address,
        name: name || address,
        type,
      },
    })

    return this.findAccount(network, address)
  }

  async lookupIntegrations({ userId, address, identityId }: { userId?: string; address: string; identityId?: string }) {
    const bonfida = await this.solana.bonfidaLookup(address)
    for (const token of (bonfida ?? [])?.filter((i) => !!i)) {
      await this.discoverAccount(userId, NetworkType.SolanaMainnet, token.publicKey, token.type, token.name, identityId)
    }

    const gumUser = await this.core.gum.getGumProfile(address)

    if (gumUser?.user?.cl_pubkey) {
      await this.discoverAccount(
        userId,
        NetworkType.SolanaDevnet,
        gumUser?.user?.cl_pubkey,
        AccountType.GumUser,
        gumUser?.user?.cl_pubkey,
        identityId,
      )
    }
    for (const gumProfile of gumUser?.profiles) {
      await this.discoverAccount(
        userId,
        NetworkType.SolanaDevnet,
        gumProfile?.cl_pubkey,
        AccountType.GumProfile,
        gumProfile?.cl_pubkey,
        identityId,
      )
    }
    for (const gumProfileMeta of gumUser?.meta) {
      await this.discoverAccount(
        userId,
        NetworkType.SolanaDevnet,
        gumProfileMeta?.cl_pubkey,
        AccountType.GumProfileMeta,
        gumProfileMeta?.cl_pubkey,
        identityId,
      )
    }
  }

  async getAccountHistory(userId: string, network: NetworkType, address: string) {
    await this.core.ensureUserActive(userId)
    return this.solana.getHeliusTransactions(network, address)
  }

  private findAccount(network: NetworkType, address: string) {
    return this.core.data.account.findUnique({
      where: {
        address_network: { address, network },
      },
      include: { discoveredBy: true, owner: true, tokens: true, identity: { include: { owner: true } } },
    })
  }
}
