import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminCreateDomainInput } from './dto/admin-create-domain.input'
import { AdminListDomainInput } from './dto/admin-list-domain.input'
import { AdminUpdateDomainInput } from './dto/admin-update-domain.input'

@Injectable()
export class ApiDomainAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async adminCreateDomain(adminId: string, input: AdminCreateDomainInput) {
    await this.core.ensureUserAdmin(adminId)
    const { ownerId, ...data } = input

    return this.core.data.domain.create({
      data: {
        ...data,
        owner: {
          connect: {
            id: ownerId?.length ? ownerId : adminId,
          },
        },
      },
    })
  }

  async adminDeleteDomain(adminId: string, domainId: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.domain.delete({ where: { id: domainId } })
  }

  async adminDomains(adminId: string, input: AdminListDomainInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.domain.findMany({
      where: { ownerId: input.ownerId ? input.ownerId : undefined },
      include: { owner: true, pages: { include: { page: true } } },
      orderBy: [{ premium: 'asc' }, { order: 'asc' }],
    })
  }

  async adminDomain(adminId: string, domainId: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.domain.findUnique({
      where: { id: domainId },
      include: { owner: true, pages: { include: { page: true } } },
    })
  }

  async adminUpdateDomain(adminId: string, domainId: string, input: AdminUpdateDomainInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.domain.update({ where: { id: domainId }, data: input })
  }
}
