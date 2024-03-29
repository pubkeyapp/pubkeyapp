import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminUserService } from './api-admin-user.service'
import { ApiPublicUserService } from './api-public-user.service'
import { ApiUserUserService } from './api-user-user.service'

@Module({
  controllers: [],
  providers: [ApiAdminUserService, ApiPublicUserService, ApiUserUserService],
  exports: [ApiAdminUserService, ApiPublicUserService, ApiUserUserService],
  imports: [ApiCoreDataAccessModule, ApiAccountDataAccessModule],
})
export class ApiUserDataAccessModule {}
