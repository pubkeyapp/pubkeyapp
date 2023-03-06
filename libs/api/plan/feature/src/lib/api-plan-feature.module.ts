import { ApiPlanDataAccessModule } from '@pubkeyapp/api/plan/data-access'
import { Module } from '@nestjs/common'
import { ApiPlanFeatureAdminResolver } from './api-plan-feature-admin.resolver'
import { ApiPlanFeatureController } from './api-plan-feature.controller'
import { ApiPlanFeatureResolver } from './api-plan-feature.resolver'

@Module({
  controllers: [ApiPlanFeatureController],
  imports: [ApiPlanDataAccessModule],
  providers: [ApiPlanFeatureResolver, ApiPlanFeatureAdminResolver],
})
export class ApiPlanFeatureModule {}
