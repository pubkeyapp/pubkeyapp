import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { DoneCallback, Job } from 'bull'
import { QueueType } from '../../entity/queue-type.enum'
import { ApiQueueCloseAccountService } from './api-queue-close-account.service'

@Processor(QueueType.CloseAccount)
export class ApiQueueCloseAccountProcessor {
  private readonly logger = new Logger(ApiQueueCloseAccountProcessor.name)

  constructor(private readonly service: ApiQueueCloseAccountService) {}

  @Process({ name: 'process' })
  async handleProcess(job: Job, cb: DoneCallback) {
    this.logger.log(JSON.stringify(job, null, 2))
    cb(null, { data: job.data })
  }
}
