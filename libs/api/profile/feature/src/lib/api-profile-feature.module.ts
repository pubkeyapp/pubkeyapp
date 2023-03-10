import { Module } from '@nestjs/common'
import { ApiProfileDataAccessModule } from '@pubkeyapp/api/profile/data-access'
import { ApiAdminProfileResolver } from './api-admin-profile.resolver'
import { ApiProfileController } from './api-profile.controller'
import { ApiProfileFieldResolver } from './api-profile-field.resolver'
import { ApiUserProfileResolver } from './api-user-profile.resolver'

@Module({
  controllers: [ApiProfileController],
  imports: [ApiProfileDataAccessModule],
  providers: [ApiAdminProfileResolver, ApiProfileFieldResolver, ApiUserProfileResolver],
})
export class ApiProfileFeatureModule {}
