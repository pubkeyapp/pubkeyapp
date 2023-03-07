import { Module } from '@nestjs/common'
import { ApiPageDataAccessModule } from '@pubkeyapp/api/page/data-access'
import { ApiAdminPageResolver } from './api-admin-page.resolver'
import { ApiAdminPageBlockResolver } from './api-admin-page-block.resolver'
import { ApiUserPageBlockResolver } from './api-user-page-block.resolver'
import { ApiPageDomainAdminResolver } from './api-page-domain-admin.resolver'
import { ApiPageDomainResolver } from './api-page-domain.resolver'
import { ApiPublicPageController } from './api-public-page.controller'
import { ApiPublicPageResolver } from './api-public-page.resolver'
import { ApiUserPageResolver } from './api-user-page.resolver'

@Module({
  controllers: [ApiPublicPageController],
  imports: [ApiPageDataAccessModule],
  providers: [
    ApiPublicPageResolver,
    ApiAdminPageResolver,
    ApiUserPageResolver,
    ApiAdminPageBlockResolver,
    ApiUserPageBlockResolver,
    ApiPageDomainResolver,
    ApiPageDomainAdminResolver,
  ],
})
export class ApiPageFeatureModule {}
