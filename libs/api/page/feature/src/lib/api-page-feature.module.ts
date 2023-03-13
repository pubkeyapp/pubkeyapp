import { Module } from '@nestjs/common'
import { ApiPageDataAccessModule } from '@pubkeyapp/api/page/data-access'
import { ApiAdminPageBlockResolver } from './api-admin-page-block.resolver'
import { ApiAdminPageDomainResolver } from './api-admin-page-domain.resolver'
import { ApiAdminPageResolver } from './api-admin-page.resolver'
import { ApiAnonPageController } from './api-anon-page.controller'
import { ApiAnonPageResolver } from './api-anon-page.resolver'
import { ApiPageDomainFieldResolver } from './api-page-domain-field.resolver'
import { ApiPageFieldResolver } from './api-page-field.resolver'
import { ApiUserPageBlockResolver } from './api-user-page-block.resolver'
import { ApiUserPageDomainResolver } from './api-user-page-domain.resolver'
import { ApiUserPageResolver } from './api-user-page.resolver'

@Module({
  controllers: [ApiAnonPageController],
  imports: [ApiPageDataAccessModule],
  providers: [
    ApiAdminPageBlockResolver,
    ApiAdminPageDomainResolver,
    ApiAdminPageResolver,
    ApiAnonPageResolver,
    ApiPageDomainFieldResolver,
    ApiPageFieldResolver,
    ApiUserPageBlockResolver,
    ApiUserPageDomainResolver,
    ApiUserPageResolver,
  ],
})
export class ApiPageFeatureModule {}
