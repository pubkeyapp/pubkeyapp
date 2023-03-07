import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminPageBlockService } from './api-admin-page-block.service'
import { ApiAdminPageDomainService } from './api-admin-page-domain.service'
import { ApiAdminPageService } from './api-admin-page.service'
import { ApiPublicPageService } from './api-public-page.service'
import { ApiUserPageBlockService } from './api-user-page-block.service'
import { ApiUserPageService } from './api-user-page.service'

const services = [
  ApiAdminPageBlockService,
  ApiAdminPageDomainService,
  ApiAdminPageService,
  ApiPublicPageService,
  ApiUserPageBlockService,
  ApiUserPageService,
]

@Module({
  providers: [...services],
  exports: [...services],
  imports: [ApiCoreDataAccessModule],
})
export class ApiPageDataAccessModule {}
