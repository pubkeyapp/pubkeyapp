import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiPageAdminService } from './api-page-admin.service'
import { ApiPageBlockAdminService } from './api-page-block-admin.service'
import { ApiPageDomainAdminService } from './api-page-domain-admin.service'
import { ApiPagePublicService } from './api-page-public.service'

@Module({
  providers: [ApiPagePublicService, ApiPageAdminService, ApiPageBlockAdminService, ApiPageDomainAdminService],
  exports: [ApiPagePublicService, ApiPageAdminService, ApiPageBlockAdminService, ApiPageDomainAdminService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiPageDataAccessModule {}
