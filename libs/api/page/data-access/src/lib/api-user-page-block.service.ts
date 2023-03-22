import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { ApiUserPageService } from './api-user-page.service'

import { UserAddPageBlockInput } from './dto/user-add-page-block.input'
import { UserUpdatePageBlockInput } from './dto/user-update-page-block.input'

@Injectable()
export class ApiUserPageBlockService {
  constructor(private readonly core: ApiCoreService, private readonly page: ApiUserPageService) {}

  async userAddPageBlock(userId: string, pageId: string, input: UserAddPageBlockInput) {
    await this.page.ensurePageOwner(userId, pageId)
    return this.core.data.pageBlock.create({
      data: {
        pageId,
        ...input,
        data: JSON.parse(JSON.stringify(input.data ?? {})),
      },
      include: { page: { include: { blocks: true } } },
    })
  }

  async userUpdatePageBlock(userId: string, pageId: string, pageBlockId: string, input: UserUpdatePageBlockInput) {
    await this.page.ensurePageOwner(userId, pageId)
    const found = await this.getPageBlock(pageBlockId)
    if (!found) {
      throw new Error('PageBlock could not be found')
    }
    return this.core.data.pageBlock.update({
      where: { id: pageBlockId },
      data: {
        pageId,
        ...input,
        data: JSON.parse(JSON.stringify(input.data ?? {})),
      },
      include: { page: { include: { blocks: true } } },
    })
  }

  async userRemovePageBlock(userId: string, pageId: string, pageBlockId: string) {
    await this.page.ensurePageOwner(userId, pageId)

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

  private async getPageBlock(pageBlockId: string) {
    return this.core.data.pageBlock.findUnique({
      where: { id: pageBlockId },
      include: { page: true },
    })
  }
}
