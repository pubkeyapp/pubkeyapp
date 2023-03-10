import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiUserIdentityService } from './api-user-identity.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  providers: [ApiUserIdentityService],
  exports: [ApiUserIdentityService],
  imports: [ApiAccountDataAccessModule, ApiCoreDataAccessModule],
})
export class ApiIdentityDataAccessModule {}
