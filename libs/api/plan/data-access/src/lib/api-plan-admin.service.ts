import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminCreatePlanInput } from './dto/admin-create-plan.input'
import { AdminListPlanInput } from './dto/admin-list-plan.input'
import { AdminUpdatePlanInput } from './dto/admin-update-plan.input'

@Injectable()
export class ApiPlanAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async adminCreatePlan(adminId: string, input: AdminCreatePlanInput) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.plan.create({
      data: {
        ...input,
      },
      include: { features: true },
    })
  }

  async adminDeletePlan(adminId: string, id: string) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.plan.delete({ where: { id } })
  }

  async adminPlans(adminId: string, input: AdminListPlanInput) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.plan.findMany({
      where: {},
      include: { features: true },
    })
  }

  async adminPlan(adminId: string, id: string) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.plan.findUnique({ where: { id }, include: { features: true } })
  }

  async adminUpdatePlan(adminId: string, id: string, input: AdminUpdatePlanInput) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.plan.update({
      where: { id },
      data: { ...input },
    })
  }
}
