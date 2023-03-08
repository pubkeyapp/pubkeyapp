import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { AccountType, IdentityProvider, NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'

export const BLOCKED_ACCOUNTS = [
  // These are accounts that won't be found
  'NativeLoader1111111111111111111111111111111',
]

@Injectable()
export class ApiAnonAccountService implements OnModuleInit {
  private readonly logger = new Logger(ApiAnonAccountService.name)
  constructor(private readonly core: ApiCoreService, private readonly solana: ApiSolanaService) {
    //
    //
    // this.core.data.account.deleteMany().then((res) => {
    //   console.log('Deleted all accounts', res)
    // })
  }

  async onModuleInit() {}

  async getAccount(userId: string, network: NetworkType, address: string) {
    await this.core.ensureUserActive(userId)
    if (BLOCKED_ACCOUNTS.includes(address)) {
      throw new NotFoundException(`Account ${address} not found on ${network} `)
    }

    const found = await this.findAccount(network, address)
    if (found) {
      return found
    }

    return this.discoverAccount(userId, network, address)
  }

  private async discoverAccount(
    userId: string,
    network: NetworkType,
    address: string,
    type?: AccountType,
    name?: string,
    identityId?: string,
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

    const created = await this.core.data.account.create({
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

    if (network === NetworkType.SolanaMainnet) {
      const bonfida = await this.solana.bonfidaLookup(created.address)
      for (const token of (bonfida ?? [])?.filter((i) => !!i)) {
        await this.discoverAccount(userId, network, token.publicKey, token.type, token.name, identityId ?? identity.id)
      }
    }

    return this.findAccount(network, address)
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
