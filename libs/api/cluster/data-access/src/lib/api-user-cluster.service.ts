import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'

@Injectable()
export class ApiUserClusterService {
  private readonly logger = new Logger(ApiUserClusterService.name)

  constructor(readonly core: ApiCoreService) {}

  async userGetClusters(userId: string) {
    await this.core.ensureUserActive(userId)

    const found = await this.core.data.cluster.findMany({ orderBy: { name: 'asc' } })

    if (!found.length) {
      throw new NotFoundException(`No clusters found`)
    }

    return found
  }

  async userGetCluster(userId: string, clusterId: string) {
    await this.core.ensureUserActive(userId)

    const found = await this.findCluster(clusterId)

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
