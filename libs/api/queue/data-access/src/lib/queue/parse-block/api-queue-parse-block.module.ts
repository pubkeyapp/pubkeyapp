import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { QueueType } from '../../entity/queue-type.enum'
import { ApiQueueParseBlockProcessor } from './api-queue-parse-block.processor'
import { ApiQueueParseBlockService } from './api-queue-parse-block.service'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    BullModule.registerQueue({
      name: QueueType.ParseBlock,
    }),
  ],
  providers: [ApiQueueParseBlockProcessor, ApiQueueParseBlockService],
  exports: [ApiQueueParseBlockService],
})
export class ApiQueueParseBlockModule {}
