import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminQueueService } from './api-admin-queue.service'

@Module({
  controllers: [],
  providers: [ApiAdminQueueService],
  exports: [ApiAdminQueueService],
  imports: [ApiAccountDataAccessModule, ApiCoreDataAccessModule],
})
export class ApiQueueDataAccessModule {}
