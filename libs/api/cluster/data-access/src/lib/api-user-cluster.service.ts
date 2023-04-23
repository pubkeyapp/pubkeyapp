import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { ClusterType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'

@Injectable()
export class ApiUserClusterService {
  private readonly logger = new Logger(ApiUserClusterService.name)

  constructor(readonly core: ApiCoreService) {}

  async userGetClusters(userId: string) {
    await this.core.ensureUserActive(userId)

    let found = await this.core.data.cluster.findMany({ orderBy: { name: 'asc' } })

    if (!found.length) {
      throw new NotFoundException(`No clusters found`)
    }

    return found
  }

  async userGetCluster(userId: string, clusterId: string) {
    await this.core.ensureUserActive(userId)

    let found = await this.findCluster(clusterId)

    if (!found) {
      throw new NotFoundException(`Cluster ${clusterId} not found on  (after discovery)`)
    }

    return found
  }

  private findCluster(id: string) {
    return this.core.data.cluster.findUnique({
      where: { id },
    })
  }
}
