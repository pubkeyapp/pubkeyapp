import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminAddPageDomainInput } from './dto/admin-add-page-domain.input'

@Injectable()
export class ApiAdminPageDomainService {
  constructor(private readonly core: ApiCoreService) {}

  async adminPageDomain(adminId: string, domainId: string, path: string) {
    await this.core.ensureAdminUser(adminId)

    return this.core.data.pageDomain.findUnique({
      where: { domainId_path: { domainId, path } },
      include: { domain: true, page: true },
    })
  }

  async adminAddPageDomain(adminId: string, pageId: string, input: AdminAddPageDomainInput) {
    const found = await this.adminPageDomain(adminId, input.domainId, input.path)
    if (found) {
      throw new Error('PageDomain already exists')
    }
    return this.core.data.pageDomain.create({
      data: { pageId, domainId: input.domainId, path: input.path },
      include: { page: { include: { domains: true } } },
    })
  }

  async adminRemovePageDomain(adminId: string, pageId: string, pageDomainId: string) {
    await this.core.ensureAdminUser(adminId)

    const pageDomain = await this.core.data.pageDomain.findFirst({
      where: { pageId, id: pageDomainId },
    })
    if (!pageDomain) {
      throw new Error('PageDomain could not be found')
    }
    return this.core.data.pageDomain.delete({
      where: { id: pageDomainId },
      include: { page: { include: { domains: true } } },
    })
  }
}
