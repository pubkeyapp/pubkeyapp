import { Injectable } from '@nestjs/common'
import { PageBlockType, PageStatus } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { UserCreatePageInput } from './dto/user-create-page.input'
import { UserUpdatePageInput } from './dto/user-update-page.input'

@Injectable()
export class ApiUserPageService {
  constructor(private readonly core: ApiCoreService) {}

  async userCreatePage(userId: string, input: UserCreatePageInput) {
    await this.core.ensureUserActive(userId)
    return this.core.data.page.create({
      data: {
        ownerId: input.ownerId ?? userId,
        status: PageStatus.Draft,
        ...input,
        blocks: {
          create: [{ type: PageBlockType.Header, data: { text: '## Hello, World!' } }],
        },
      },
    })
  }

  async userDeletePage(userId: string, pageId: string) {
    await this.ensurePageOwner(userId, pageId)
    await this.core.data.pageBlock.deleteMany({ where: { pageId } })
    return this.core.data.page.delete({ where: { id: pageId } })
  }

  userPage(userId: string, pageId: string) {
    return this.ensurePageOwner(userId, pageId)
  }

  async userUpdatePage(userId: string, pageId: string, input: UserUpdatePageInput) {
    await this.ensurePageOwner(userId, pageId)
    return this.core.data.page.update({ where: { id: pageId }, data: input })
  }

  async ensurePageOwner(userId: string, pageId: string) {
    await this.core.ensureUserActive(userId)
    const page = await this.core.data.page.findUnique({
      where: { id: pageId },
      include: {
        owner: true,
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
        domains: { include: { domain: true } },
      },
    })
    if (!page) {
      throw new Error('Page could not be found')
    }
    if (page.ownerId !== userId) {
      throw new Error('Page does not belong to user')
    }
    return page
  }
}
