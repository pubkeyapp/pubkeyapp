import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminProfileService } from './api-admin-profile.service'
import { ApiPublicProfileService } from './api-public-profile.service'
import { ApiUserProfileService } from './api-user-profile.service'

const providers = [ApiAdminProfileService, ApiPublicProfileService, ApiUserProfileService]

@Module({
  providers,
  exports: providers,
  imports: [ApiCoreDataAccessModule, ApiAccountDataAccessModule],
})
export class ApiProfileDataAccessModule {}
