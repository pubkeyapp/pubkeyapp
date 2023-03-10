import { Injectable } from '@nestjs/common'
import { PageBlockType, PageStatus, PageType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminCreatePageInput } from './dto/admin-create-page.input'
import { AdminGetPagesInput } from './dto/admin-get-pages.input'
import { AdminUpdatePageInput } from './dto/admin-update-page.input'

@Injectable()
export class ApiAdminPageService {
  constructor(private readonly core: ApiCoreService) {}

  async adminCreatePage(adminId: string, input: AdminCreatePageInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.page.create({
      data: {
        ownerId: input.ownerId ?? adminId,
        status: PageStatus.Draft,
        ...input,
        blocks: {
          create: [{ type: PageBlockType.Header, data: { text: '## Hello, World!' } }],
        },
      },
    })
  }

  async adminDeletePage(adminId: string, pageId: string) {
    await this.core.ensureUserAdmin(adminId)
    await this.core.data.pageBlock.deleteMany({ where: { pageId } })
    return this.core.data.page.delete({ where: { id: pageId } })
  }

  async adminGetPagesInput(adminId: string, input: AdminGetPagesInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.page.findMany({
      where: { ownerId: input.ownerId ? input.ownerId : undefined },
      include: { owner: true, domains: { include: { domain: true } }, profile: true },
    })
  }

  async adminGetPage(adminId: string, pageId: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.page.findUnique({
      where: { id: pageId },
      include: {
        owner: true,
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
        domains: { include: { domain: true } },
        profile: true,
      },
    })
  }

  async adminUpdatePage(adminId: string, pageId: string, input: AdminUpdatePageInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.page.update({ where: { id: pageId }, data: input })
  }
}
