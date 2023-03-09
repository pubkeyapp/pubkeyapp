import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminProfileService } from './api-admin-profile.service'
import { ApiPublicProfileService } from './api-public-profile.service'
import { ApiUserProfileService } from './api-user-profile.service'

const providers = [ApiAdminProfileService, ApiPublicProfileService, ApiUserProfileService]

@Module({
  providers,
  exports: providers,
  imports: [ApiCoreDataAccessModule],
})
export class ApiProfileDataAccessModule {}
