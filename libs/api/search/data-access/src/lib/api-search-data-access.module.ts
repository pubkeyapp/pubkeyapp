import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiUserSearchService } from './api-user-search.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  providers: [ApiUserSearchService],
  exports: [ApiUserSearchService],
  imports: [ApiAccountDataAccessModule, ApiCoreDataAccessModule],
})
export class ApiSearchDataAccessModule {}
