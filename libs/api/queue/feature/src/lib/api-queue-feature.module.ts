import { ApiQueueDataAccessModule } from '@pubkeyapp/api/queue/data-access'
import { Module } from '@nestjs/common'
import { ApiAdminQueueResolver } from './api-admin-queue.resolver'

@Module({
  providers: [ApiAdminQueueResolver],
  imports: [ApiQueueDataAccessModule],
})
export class ApiQueueFeatureModule {}
