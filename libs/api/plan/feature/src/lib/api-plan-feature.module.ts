import { ApiPlanDataAccessModule } from '@pubkeyapp/api/plan/data-access'
import { Module } from '@nestjs/common'
import { ApiAdminPlanResolver } from './api-admin-plan.resolver'
import { ApiPlanController } from './api-plan.controller'
import { ApiAnonPlanResolver } from './api-anon-plan.resolver'

@Module({
  controllers: [ApiPlanController],
  imports: [ApiPlanDataAccessModule],
  providers: [ApiAnonPlanResolver, ApiAdminPlanResolver],
})
export class ApiPlanFeatureModule {}
