import { ApiInviteDataAccessModule } from '@pubkeyapp/api/invite/data-access'
import { Module } from '@nestjs/common'
import { ApiInviteFeatureAdminResolver } from './api-invite-feature-admin.resolver'
import { ApiInviteFeatureController } from './api-invite-feature.controller'
import { ApiInviteFeatureResolver } from './api-invite-feature.resolver'

@Module({
  controllers: [ApiInviteFeatureController],
  imports: [ApiInviteDataAccessModule],
  providers: [ApiInviteFeatureResolver, ApiInviteFeatureAdminResolver],
})
export class ApiInviteFeatureModule {}
