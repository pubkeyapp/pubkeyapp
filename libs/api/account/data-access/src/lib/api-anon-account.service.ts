import { keypairIdentity, Metaplex } from '@metaplex-foundation/js'
import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { AccountType, IdentityProvider, NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'
import { ClusterType } from '@pubkeyapp/solana'
import { Keypair, PublicKey } from '@solana/web3.js'
import { ApiAccountQueueService } from './queue/api-account-queue.service'

export const BLOCKED_ACCOUNTS = [
  // These are accounts that won't be found
  'NativeLoader1111111111111111111111111111111',
]

@Injectable()
export class ApiAnonAccountService implements OnModuleInit {
  private readonly logger = new Logger(ApiAnonAccountService.name)
  constructor(
    readonly core: ApiCoreService,
    private readonly solana: ApiSolanaService,
    private readonly queue: ApiAccountQueueService,
  ) {
    // this.core.data.account.deleteMany().then((res) => {
    //   console.log('Deleted all accounts', res)
    // })
  }

  async onModuleInit() {}

  async userGetAccount(userId: string, network: NetworkType, address: string, sync = false, identityId?: string) {
    if (sync) {
      // const metas = await this.core.data.account.count({
      //   where: { owner: { address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' } },
      // })
      // console.log('metas', metas)
      // return null
      // await this.queue.processAccountDiscover({
      //   userId,
      //   address,
      //   network,
      // })
    }

    await this.core.ensureUserActive(userId)
    if (BLOCKED_ACCOUNTS.includes(address)) {
      throw new NotFoundException(`Account ${address} not found on ${network} (Blocked)`)
    }

    let found = await this.findAccount(network, address)

    if (!found) {
      found = await this.discoverAccount({
        userId,
        network,
        address,
        identityId,
      })
    }
    if (!found) {
      throw new NotFoundException(`Account ${address} not found on ${network} (after discovery)`)
    }

    if (sync) {
      await this.lookupIntegrations({
        userId,
        address,
        identityId: identityId ?? found.identityId,
      })
    }

    return found
  }

  private async discoverAccount({
    userId,
    network,
    address,
    type,
    name,
    identityId,
    metadata,
  }: {
    userId: string
    network: NetworkType
    address: string
    type?: AccountType
    name?: string
    identityId?: string
    metadata?: any
  }) {
    if (BLOCKED_ACCOUNTS.includes(address)) {
      this.logger.warn(`Account ${address} not index on ${network} (Blocked)`)
      return
    }
    const ignoreKey = `ignore-account:${network}:${address}`
    const ignoreTtlSeconds = 60 * 60
    const ignore = await this.core.cache.get('solana', ignoreKey)
    if (ignore) {
      this.logger.warn(`Account ${address} not index on ${network} (Ignored)`)
      return
    }
    this.logger.verbose(`Discovering account ${address} on ${network}`)

    const cacheKey = `discover-account:${network}:${address}`
    const cacheTtlSeconds = 60
    return this.core.cache.wrap(
      'solana',
      cacheKey,
      async () => {
        const solana = this.solana.getSolanaNetwork(network)
        if (!solana) {
          this.logger.warn(`Account ${address} not index on ${network} (No Solana)`)
          return
        }
        const accountInfo = await solana.getAccountInfo(address)

        if (
          !accountInfo.isMint &&
          !accountInfo.isOwner &&
          !accountInfo.isSystemAccount &&
          !accountInfo.isTokenAccount &&
          !accountInfo.program
        ) {
          console.log('Account not found', address, accountInfo)
          await this.core.cache.set('solana', ignoreKey, true, ignoreTtlSeconds)
          throw new NotFoundException(`Account ${address} not found on ${network} `)
        }
        let foundOwner
        if (accountInfo.program) {
          this.logger.verbose(`Program Account ${address} is owned by ${accountInfo.program?.toString()}`)
          foundOwner = await this.core.data.account.findFirst({
            where: {
              network,
              address: accountInfo.program?.toString(),
            },
          })

          if (!foundOwner) {
            // Index the owner
            this.logger.log(`Indexing owner ${accountInfo.program?.toString()}`)
            foundOwner = await this.discoverAccount({
              userId,
              network,
              address: accountInfo.program?.toString(),
            }).catch((e) => this.logger.error('Error indexing owner', e))
          }
        }

        const exists = await this.findAccount(network, address)
        if (exists) {
          this.logger.log(`Account ${address} already exists`)
          return exists
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
            metadata,
          },
        })

        return this.findAccount(network, address)
      },
      cacheTtlSeconds,
    )
  }

  async lookupIntegrations({ userId, address, identityId }: { userId?: string; address: string; identityId?: string }) {
    const bonfida = await this.core.cache.wrap(
      'solana',
      `bonfida:${address}`,
      () => this.solana.bonfidaLookup(address),
      60,
    )
    for (const token of (bonfida ?? [])?.filter((i) => !!i)) {
      await this.discoverAccount({
        userId,
        network: NetworkType.SolanaMainnet,
        address: token.publicKey,
        type: token.type,
        name: token.name,
        identityId,
      })
    }

    const gumUser = await this.core.cache.wrap(
      'solana',
      `gum:${address}`,
      () => this.core.gum.getGumProfile(address),
      60,
    )

    if (gumUser?.user?.cl_pubkey) {
      await this.discoverAccount({
        userId,
        network: NetworkType.SolanaDevnet,
        address: gumUser?.user?.cl_pubkey,
        type: AccountType.GumUser,
        name: gumUser?.user?.cl_pubkey,
        identityId,
      })
    }
    for (const gumProfile of gumUser?.profiles) {
      await this.discoverAccount({
        userId,
        network: NetworkType.SolanaDevnet,
        address: gumProfile?.cl_pubkey,
        type: AccountType.GumProfile,
        name: gumProfile?.cl_pubkey,
        identityId,
      })
    }
    for (const gumProfileMeta of gumUser?.meta) {
      await this.discoverAccount({
        userId,
        network: NetworkType.SolanaDevnet,
        address: gumProfileMeta?.cl_pubkey,
        type: AccountType.GumProfileMeta,
        name: gumProfileMeta?.cl_pubkey,
        identityId,
      })
    }

    // Lookup Metaplex data
    const metaplex = await this.core.cache.wrap(
      'solana',
      `metaplex:${address}`,
      () =>
        Metaplex.make(this.solana.getSolana(ClusterType.Mainnet).connection)
          .use(keypairIdentity(Keypair.generate()))
          .nfts()
          .findAllByOwner({ owner: new PublicKey(address) }),
      60 * 60,
    )

    for (const item of metaplex) {
      if (!item.address) {
        this.logger.warn(`Metaplex item ${item.name} has no address`)
        console.log('item', item)
        continue
      }

      let fetched
      try {
        fetched = await fetch(item.uri).then((data) => data.json())
      } catch (e) {
        this.logger.error(`Error fetching metaplex meta data ${item.name} uri ${item.uri}`, e)
      }

      await this.discoverAccount({
        userId,
        network: NetworkType.SolanaMainnet,
        address: item.address?.toBase58(),
        type: AccountType.MetaplexNFT,
        name: item.name,
        identityId,
        metadata: JSON.parse(JSON.stringify({ ...item, fetched })),
      })
    }
  }

  async userGetAccountHistory(userId: string, network: NetworkType, address: string) {
    await this.core.ensureUserActive(userId)
    return this.solana.getHeliusTransactions(network, address)
  }

  private findAccount(network: NetworkType, address: string) {
    return this.core.data.account.findUnique({
      where: {
        address_network: { address, network },
      },
      include: {
        discoveredBy: { include: { profile: true } },
        owner: true,
        tokens: true,
        identity: { include: { owner: true } },
      },
    })
  }
}
