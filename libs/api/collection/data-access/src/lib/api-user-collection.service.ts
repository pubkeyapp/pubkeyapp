import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'

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

  async userGetCollection(userId: string, network: NetworkType, address: string) {
    await this.core.ensureUserActive(userId)

    let found = await this.findCollection(network, address)

    if (!found) {
      throw new NotFoundException(`Collection ${address} not found on ${network} (after discovery)`)
    }

    return found
  }

  private findCollection(network: NetworkType, address: string) {
    return this.core.data.collection.findUnique({
      where: {
        address_network: { address, network },
      },
    })
  }
}
