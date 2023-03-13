import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { UserAddPageDomainInput } from './dto/user-add-page-domain.input'

@Injectable()
export class ApiUserPageDomainService {
  constructor(private readonly core: ApiCoreService) {}

  async userGetPageDomain(userId: string, domainId: string, path: string) {
    console.log('userGetPageDomain', userId, domainId, path)
    await this.core.ensureUserActive(userId)

    return this.core.data.pageDomain.findUnique({
      where: { domainId_path: { domainId, path } },
      include: { domain: true, page: true },
    })
  }

  async userAddPageDomain(userId: string, pageId: string, input: UserAddPageDomainInput) {
    const found = await this.userGetPageDomain(userId, input.domainId, input.path)
    if (found) {
      throw new Error('PageDomain already exists')
    }
    console.log('userAddPageDomain', userId, pageId, input)
    const domain = await this.core.data.domain.findUnique({ where: { id: input.domainId } })
    if (!domain) {
      throw new Error('Domain could not be found')
    }
    if (domain.private && domain.ownerId !== userId) {
      throw new Error('Domain does not belong to user')
    }
    return this.core.data.pageDomain.create({
      data: { pageId, domainId: input.domainId, path: input.path },
      include: { page: { include: { domains: true } } },
    })
  }

  async userRemovePageDomain(userId: string, pageId: string, pageDomainId: string) {
    await this.core.ensureUserActive(userId)

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
