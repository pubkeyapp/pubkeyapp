import { ApiQueueDataAccessModule } from '@pubkeyapp/api/queue/data-access'
import { Module } from '@nestjs/common'
import { ApiQueueAdminFeatureResolver } from './api-queue-admin-feature.resolver'

@Module({
  providers: [ApiQueueAdminFeatureResolver],
  imports: [ApiQueueDataAccessModule],
})
export class ApiQueueFeatureModule {}
