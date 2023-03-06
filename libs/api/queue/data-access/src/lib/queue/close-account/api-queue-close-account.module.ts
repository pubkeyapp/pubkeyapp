import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { QueueType } from '../../entity/queue-type.enum'
import { ApiQueueCloseAccountProcessor } from './api-queue-close-account.processor'
import { ApiQueueCloseAccountService } from './api-queue-close-account.service'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    BullModule.registerQueue({
      name: QueueType.CloseAccount,
    }),
  ],
  providers: [ApiQueueCloseAccountProcessor, ApiQueueCloseAccountService],
  exports: [ApiQueueCloseAccountService],
})
export class ApiQueueCloseAccountModule {}
