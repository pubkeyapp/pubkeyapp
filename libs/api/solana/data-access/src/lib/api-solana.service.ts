import { getAllDomains, getHandleAndRegistryKey, reverseLookup } from '@bonfida/spl-name-service'
import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { AccountType, NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { TokenInfo } from '@pubkeyapp/api/solana/util'
import { ClusterType, Solana } from '@pubkeyapp/solana'
import { Connection, PublicKey } from '@solana/web3.js'
import axios from 'axios'

@Injectable()
export class ApiSolanaService {
  private readonly logger = new Logger(ApiSolanaService.name)
  tokens = new Map<ClusterType, TokenInfo[]>()

  private readonly connections = new Map<ClusterType, Solana>()

  constructor(private readonly core: ApiCoreService) {}

  @OnEvent('core:reload')
  async reload() {
    this.logger.verbose('  => Reloading Solana connections')
    await this.setupConnections()
  }

  getSolana(cluster: ClusterType): Solana {
    return this.connections.get(cluster)
  }

  getSolanaNetwork(network: NetworkType): Solana {
    switch (network) {
      case NetworkType.SolanaDevnet:
        return this.connections.get(ClusterType.Devnet)
      case NetworkType.SolanaMainnet:
        return this.connections.get(ClusterType.Mainnet)
      case NetworkType.SolanaTestnet:
        return this.connections.get(ClusterType.Testnet)
    }
    return null
  }

  getHeliusUrl(network: NetworkType, path) {
    return `https://api.helius.xyz/v0/${path}?api-key=${this.core.config.heliusApiKey}`
  }

  private async setupConnections() {
    const config = await this.core.config.getConfig()
    for (const cluster of config.clusters) {
      // Bail if the endpoint is not a valid URL
      if (!cluster.endpoint.startsWith('http')) {
        this.logger.warn(`Invalid endpoint for ${cluster.type} cluster: ${cluster.endpoint}`)
        continue
      }
      const connection = new Connection(cluster.endpoint, 'confirmed')
      this.connections.set(
        cluster.type,
        new Solana({ type: cluster.type, connection, explorerUrl: cluster.explorerUrl }),
      )
      this.logger.verbose(`Connected to ${cluster.type} cluster at ${cluster.endpoint}`)
    }
  }

  async bonfidaLookup(
    publicKey: string,
  ): Promise<{ name: string; owner: string; publicKey: string; type: AccountType }[]> {
    const [domains, twitter] = await Promise.all([
      this.core.cache.wrap('bonfida', `domains:${publicKey}`, () => this.bonfidaLookupDomains(publicKey), 60 * 10),
      this.core.cache.wrap('bonfida', `twitter:${publicKey}`, () => this.bonfidaLookupTwitter(publicKey), 60 * 10),
    ])

    try {
      return [
        ...domains.map((d) => ({
          name: d.name,
          owner: publicKey,
          publicKey: d.publicKey,
          type: AccountType.BonfidaDomain,
        })),
        twitter
          ? { owner: publicKey, type: AccountType.BonfidaTwitter, name: twitter.name, publicKey: twitter.publicKey }
          : undefined,
      ]
    } catch (error) {
      this.logger.error('bonfidaReverseLookup', error)
      return null
    }
  }

  async bonfidaLookupDomains(publicKey: string): Promise<{ name: string; publicKey: string }[]> {
    const { connection } = this.getSolana(ClusterType.Mainnet)
    try {
      const publicKeys = await getAllDomains(connection, new PublicKey(publicKey))

      const domains = await Promise.all(
        publicKeys.map(async (pk) => {
          const name = await reverseLookup(connection, pk)
          return {
            name: `${name}.sol`,
            publicKey: pk.toString(),
          }
        }),
      )

      if (domains.length) {
        return domains
      }
    } catch (error) {
      this.logger.verbose(`No domains found for ${publicKey}`)
      return undefined
    }
  }

  async bonfidaLookupTwitter(publicKey: string): Promise<{ name: string; publicKey: string }> {
    const { connection } = this.getSolana(ClusterType.Mainnet)
    try {
      const [name, key] = await getHandleAndRegistryKey(connection, new PublicKey(publicKey))
      if (name && key) {
        return {
          name,
          publicKey: key.toString(),
        }
      }
    } catch (error) {
      this.logger.verbose(`No twitter handle found for ${publicKey}`)
      return undefined
    }
  }

  async getHeliusTransactions(network: NetworkType, address: string) {
    const url = this.getHeliusUrl(network, `addresses/${address}/transactions`)
    const { data } = await axios.get(url)

    return data
  }
}
