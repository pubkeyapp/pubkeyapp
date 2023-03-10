import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminUpdatePageBlockInput } from '@pubkeyapp/api/page/data-access'
import { AdminAddPageBlockInput } from './dto/admin-add-page-block.input'

@Injectable()
export class ApiAdminPageBlockService {
  constructor(private readonly core: ApiCoreService) {}

  async adminAddPageBlock(adminId: string, pageId: string, input: AdminAddPageBlockInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.pageBlock.create({
      data: {
        pageId,
        ...input,
      },
      include: { page: { include: { blocks: true } } },
    })
  }

  async adminUpdatePageBlock(adminId: string, pageId: string, pageBlockId: string, input: AdminUpdatePageBlockInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.pageBlock.update({
      where: { id: pageBlockId },
      data: { pageId, ...input },
      include: { page: { include: { blocks: true } } },
    })
  }

  async adminRemovePageBlock(adminId: string, pageId: string, pageBlockId: string) {
    await this.core.ensureUserAdmin(adminId)

    const pageBlock = await this.core.data.pageBlock.findFirst({
      where: { pageId, id: pageBlockId },
    })
    if (!pageBlock) {
      throw new Error('PageBlock could not be found')
    }
    return this.core.data.pageBlock.delete({
      where: { id: pageBlockId },
      include: { page: { include: { blocks: true } } },
    })
  }
}
