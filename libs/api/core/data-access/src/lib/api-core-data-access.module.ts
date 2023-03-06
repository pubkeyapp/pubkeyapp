import { ApiConfigDataAccessModule } from '@pubkeyapp/api/config/data-access'
import { Module } from '@nestjs/common'
import { ApiCoreDataService } from './data/api-core-data.service'
import { ApiCoreService } from './api-core.service'
import { ApiCoreCacheModule } from './cache/api-core-cache.module'

@Module({
  imports: [ApiCoreCacheModule, ApiConfigDataAccessModule],
  providers: [ApiCoreService, ApiCoreDataService],
  exports: [ApiCoreService],
})
export class ApiCoreDataAccessModule {}
