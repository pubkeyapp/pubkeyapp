import { Module } from '@nestjs/common'
import { ApiSearchDataAccessModule } from '@pubkeyapp/api/search/data-access'
import { ApiUserSearchResolver } from './api-user-search.resolver'

@Module({
  providers: [ApiUserSearchResolver],
  imports: [ApiSearchDataAccessModule],
})
export class ApiSearchFeatureModule {}
