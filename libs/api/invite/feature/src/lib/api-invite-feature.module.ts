import { Module } from '@nestjs/common'
import { ApiInviteDataAccessModule } from '@pubkeyapp/api/invite/data-access'
import { ApiAdminInviteFeatureResolver } from './api-admin-invite-feature.resolver'
import { ApiInviteFeatureController } from './api-invite-feature.controller'
import { ApiPublicInviteFeatureResolver } from './api-public-invite-feature.resolver'
import { ApiUserInviteFeatureResolver } from './api-user-invite-feature.resolver'

@Module({
  controllers: [ApiInviteFeatureController],
  imports: [ApiInviteDataAccessModule],
  providers: [ApiAdminInviteFeatureResolver, ApiPublicInviteFeatureResolver, ApiUserInviteFeatureResolver],
})
export class ApiInviteFeatureModule {}
