import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'

@Injectable()
export class ApiUserDomainService {
  constructor(private readonly core: ApiCoreService) {}

  async userGetDomains(userId: string) {
    await this.core.ensureUserActive(userId)
    return this.core.data.domain.findMany({
      where: { private: false },
      include: { owner: true, pages: { include: { page: true } } },
      orderBy: [{ premium: 'asc' }, { order: 'asc' }],
    })
  }
}
