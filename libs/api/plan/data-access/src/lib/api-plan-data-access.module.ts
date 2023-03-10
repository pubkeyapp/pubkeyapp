import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiAdminPlanService } from './api-admin-plan.service'
import { ApiAnonPlanService } from './api-anon-plan.service'

@Module({
  providers: [ApiAnonPlanService, ApiAdminPlanService],
  exports: [ApiAnonPlanService, ApiAdminPlanService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiPlanDataAccessModule {}
