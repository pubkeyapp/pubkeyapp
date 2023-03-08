import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminListAccountInput } from './dto/admin-list-account.input'

@Injectable()
export class ApiAccountAdminService {
  private readonly logger = new Logger(ApiAccountAdminService.name)
  constructor(private readonly core: ApiCoreService) {}

  async adminAccounts(adminId: string, input: AdminListAccountInput) {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.account.findMany({
      where: Object.keys(input).length
        ? {
            OR: [
              { network: input.network },
              { name: { contains: input.name } },
              { program: { contains: input.program } },
              { address: { contains: input.address } },
              { type: input.type },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        discoveredBy: true,
        owner: true,
        tokens: true,
        identity: {
          include: {
            owner: true,
          },
        },
      },
    })
  }

  async adminAccount(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)

    const account = await this.core.data.account.findUnique({
      where: {
        id,
      },
      include: {
        discoveredBy: true,
        owner: true,
        tokens: true,
        identity: {
          include: {
            owner: true,
          },
        },
      },
    })

    if (!account) {
      throw new NotFoundException()
    }

    return account
  }
}
