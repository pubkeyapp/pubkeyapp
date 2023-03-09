import { Module } from '@nestjs/common'
import { ApiProfileDataAccessModule } from '@pubkeyapp/api/profile/data-access'
import { ApiAdminProfileFeatureResolver } from './api-admin-profile-feature.resolver'
import { ApiProfileFeatureController } from './api-profile-feature.controller'
import { ApiPublicProfileFeatureResolver } from './api-public-profile-feature.resolver'
import { ApiUserProfileFeatureResolver } from './api-user-profile-feature.resolver'

@Module({
  controllers: [ApiProfileFeatureController],
  imports: [ApiProfileDataAccessModule],
  providers: [ApiAdminProfileFeatureResolver, ApiPublicProfileFeatureResolver, ApiUserProfileFeatureResolver],
})
export class ApiProfileFeatureModule {}
