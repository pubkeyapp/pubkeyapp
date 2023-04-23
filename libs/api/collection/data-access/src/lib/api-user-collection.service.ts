import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ClusterType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'

@Injectable()
export class ApiUserCollectionService {
  private readonly logger = new Logger(ApiUserCollectionService.name)

  constructor(readonly core: ApiCoreService) {}

  async userGetCollections(userId: string) {
    await this.core.ensureUserActive(userId)

    let found = await this.core.data.collection.findMany({ orderBy: { name: 'asc' } })

    if (!found.length) {
      throw new NotFoundException(`No collections found`)
    }

    return found
  }

  async userGetCollection(userId: string, cluster: ClusterType, address: string) {
    await this.core.ensureUserActive(userId)

    let found = await this.findCollection(cluster, address)

    if (!found) {
      throw new NotFoundException(`Collection ${address} not found on ${cluster} (after discovery)`)
    }

    return found
  }

  private findCollection(cluster: ClusterType, address: string) {
    return this.core.data.collection.findUnique({
      where: {
        address_cluster: { address, cluster },
      },
    })
  }
}
