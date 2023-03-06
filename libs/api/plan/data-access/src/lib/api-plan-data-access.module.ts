import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiPlanAdminService } from './api-plan-admin.service'
import { ApiPlanService } from './api-plan.service'

@Module({
  providers: [ApiPlanService, ApiPlanAdminService],
  exports: [ApiPlanService, ApiPlanAdminService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiPlanDataAccessModule {}
