import { Injectable, Logger } from '@nestjs/common'

import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { TokenInfo } from '@pubkeyapp/api/solana/util'
import { ClusterType, Solana } from '@pubkeyapp/solana'
import { Connection } from '@solana/web3.js'

@Injectable()
export class ApiSolanaDataAccessService {
  private readonly logger = new Logger(ApiSolanaDataAccessService.name)
  tokens = new Map<ClusterType, TokenInfo[]>()

  private readonly connections = new Map<ClusterType, Solana>()

  constructor(private readonly core: ApiCoreService) {
    this.setupConnections()
  }

  getSolana(cluster: ClusterType): Solana {
    return this.connections.get(cluster)
  }

  private async setupConnections() {
    const config = await this.core.config.getConfig()
    for (const cluster of config.clusters) {
      const connection = new Connection(cluster.endpoint, 'confirmed')
      this.connections.set(
        cluster.type,
        new Solana({ type: cluster.type, connection, explorerUrl: cluster.explorerUrl }),
      )
      this.logger.verbose(`Connected to ${cluster.type} cluster at ${cluster.endpoint}`)
    }
  }
}
