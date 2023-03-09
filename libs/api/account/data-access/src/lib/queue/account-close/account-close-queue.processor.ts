import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { QueueType } from '@pubkeyapp/api/core/data-access'
import { DoneCallback, Job } from 'bull'

@Processor(QueueType.AccountClose)
export class AccountCloseQueueProcessor {
  private readonly logger = new Logger(AccountCloseQueueProcessor.name)
  @Process({ name: QueueType.AccountClose })
  async handleProcess(job: Job, cb: DoneCallback) {
    this.logger.log(JSON.stringify(job, null, 2))
    cb(null, { data: job.data })
  }
}
