import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiQueueDataAccessService } from './api-queue-data-access.service'

@Module({
  controllers: [],
  providers: [ApiQueueDataAccessService],
  exports: [ApiQueueDataAccessService],
  imports: [ApiAccountDataAccessModule, ApiCoreDataAccessModule],
})
export class ApiQueueDataAccessModule {}
