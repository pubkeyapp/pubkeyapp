import { Process, Processor } from '@nestjs/bull'
import { Logger, OnModuleInit } from '@nestjs/common'
import { DoneCallback, Job } from 'bull'
import * as process from 'process'
import { QueueType } from '../../entity/queue-type.enum'
import { ApiQueueParseBlockService } from './api-queue-parse-block.service'

@Processor(QueueType.ParseBlock)
export class ApiQueueParseBlockProcessor implements OnModuleInit {
  private readonly logger = new Logger(ApiQueueParseBlockProcessor.name)

  constructor(private readonly service: ApiQueueParseBlockService) {}

  @Process({ name: 'process' })
  async handleProcess(job: Job, cb: DoneCallback) {
    const { firstSlot, lastSlot, appKey } = job.data
    this.logger.log(`---loaded process---: ${firstSlot} - ${lastSlot} - ${appKey}`)

    cb(null, { data: job.data })
  }

  @Process({ name: 'process-slot', concurrency: 12 })
  async handleProcessBlock(job: Job, cb: DoneCallback) {
    const { slot, appKey } = job.data
  }

  async onModuleInit(): Promise<void> {
    this.logger.log(`Empty Init ${process.pid}`)
  }
}
