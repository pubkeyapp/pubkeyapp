import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiUserAdminService } from './api-user-admin.service'
import { ApiUserPublicService } from './api-user-public.service'
import { ApiUserUserService } from './api-user-user.service'

@Module({
  controllers: [],
  providers: [ApiUserAdminService, ApiUserPublicService, ApiUserUserService],
  exports: [ApiUserAdminService, ApiUserPublicService, ApiUserUserService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiUserDataAccessModule {}
