import { Module } from '@nestjs/common'
import { ApiPageDataAccessModule } from '@pubkeyapp/api/page/data-access'
import { ApiAdminPageResolver } from './api-admin-page.resolver'
import { ApiAdminPageBlockResolver } from './api-admin-page-block.resolver'
import { ApiPageFieldResolver } from './api-page-field.resolver'
import { ApiUserPageBlockResolver } from './api-user-page-block.resolver'
import { ApiAdminPageDomainResolver } from './api-admin-page-domain.resolver'
import { ApiPageDomainFieldResolver } from './api-page-domain-field.resolver'
import { ApiAnonPageController } from './api-anon-page.controller'
import { ApiAnonPageResolver } from './api-anon-page.resolver'
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
    ApiUserPageResolver,
  ],
})
export class ApiPageFeatureModule {}
