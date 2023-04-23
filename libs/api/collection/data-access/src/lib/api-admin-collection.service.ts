import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminCreateCollectionInput } from './dto/admin-create-collection.input'
import { AdminGetCollectionsInput } from './dto/admin-get-collections.input'
import { AdminUpdateCollectionInput } from './dto/admin-update-collection.input'

@Injectable()
export class ApiAdminCollectionService {
  private readonly logger = new Logger(ApiAdminCollectionService.name)
  constructor(private readonly core: ApiCoreService) {}

  async adminCreateCollection(adminId: string, input: AdminCreateCollectionInput) {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.collection.create({
      data: {
        name: input.name,
        address: input.address,
        cluster: input.cluster,
      },
    })
  }

  async adminGetCollections(adminId: string, input: AdminGetCollectionsInput) {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.collection.findMany({
      where: Object.keys(input).length
        ? {
            OR: [
              { cluster: input.cluster },
              { name: { contains: input.name } },
              { address: { contains: input.address } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    })
  }

  async adminGetCollection(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)

    const collection = await this.core.data.collection.findUnique({
      where: {
        id,
      },
    })

    if (!collection) {
      throw new NotFoundException()
    }

    return collection
  }

  async adminDeleteCollection(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)

    try {
      await this.core.data.collection.delete({ where: { id: collectionId } })
      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  async adminUpdateCollection(adminId: string, collectionId: string, input: AdminUpdateCollectionInput) {
    await this.core.ensureUserAdmin(adminId)

    try {
      return this.core.data.collection.update({
        where: { id: collectionId },
        data: { name: input.name, address: input.address },
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
