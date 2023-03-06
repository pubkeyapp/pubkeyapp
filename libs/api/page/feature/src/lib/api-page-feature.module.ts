import { Module } from '@nestjs/common'
import { ApiPageDataAccessModule } from '@pubkeyapp/api/page/data-access'
import { ApiPageAdminResolver } from './api-page-admin.resolver'
import { ApiPageBlockAdminResolver } from './api-page-block-admin.resolver'
import { ApiPageDomainAdminResolver } from './api-page-domain-admin.resolver'
import { ApiPageDomainResolver } from './api-page-domain.resolver'
import { ApiPagePublicController } from './api-page-public.controller'
import { ApiPagePublicResolver } from './api-page-public.resolver'

@Module({
  controllers: [ApiPagePublicController],
  imports: [ApiPageDataAccessModule],
  providers: [
    ApiPagePublicResolver,
    ApiPageAdminResolver,
    ApiPageBlockAdminResolver,
    ApiPageDomainResolver,
    ApiPageDomainAdminResolver,
  ],
})
export class ApiPageFeatureModule {}
