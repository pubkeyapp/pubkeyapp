import { Module } from '@nestjs/common'
import { ApiConfigDataAccessModule } from '@pubkeyapp/api/config/data-access'
import { ApiCoreService } from './api-core.service'
import { ApiCoreCacheModule } from './cache/api-core-cache.module'
import { ApiCoreDataService } from './data/api-core-data.service'
import { ApiCoreSettingsService } from './settings/api-core-settings.service'

@Module({
  imports: [ApiCoreCacheModule, ApiConfigDataAccessModule],
  providers: [ApiCoreService, ApiCoreDataService, ApiCoreSettingsService],
  exports: [ApiCoreService],
})
export class ApiCoreDataAccessModule {}
