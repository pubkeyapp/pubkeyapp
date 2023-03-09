import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { QueueType } from '@pubkeyapp/api/core/data-access'
import { DoneCallback, Job } from 'bull'
import { ApiAnonAccountService } from '../../api-anon-account.service'
import { NetworkType } from '../../entity/network-type.enum'
import { AccountQueue } from '../api-account-queue.helper'

@Processor(AccountQueue.AccountDiscover)
export class AccountDiscoverQueueProcessor {
  private readonly logger = new Logger(AccountDiscoverQueueProcessor.name)

  constructor(private readonly account: ApiAnonAccountService) {}
  @Process({ name: QueueType.AccountDiscover })
  async handleProcess(job: Job<AccountDiscoverQueueData>, cb: DoneCallback) {
    this.logger.log(JSON.stringify(job, null, 2))

    // const data = await this.account.discoverAccount(job.data)
    //
    // const discover = await this.account.getAccount()

    cb(null, { data: job.data })
  }
}

export interface AccountDiscoverQueueData {
  address: string
  network: NetworkType
  userId: string
}
