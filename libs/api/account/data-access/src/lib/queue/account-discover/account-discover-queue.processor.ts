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

    try {
      const user = await this.account.core.getUserById(job.data.userId)
      const result = await this.account.userGetAccount(job.data.userId, job.data.network, job.data.address)
      await this.account.lookupIntegrations({
        userId: job.data.userId,
        address: job.data.address,
        identityId: user.identities[0].id,
      })
      cb(null, { data: job.data, result })
    } catch (error) {
      this.logger.error(error)
      cb(error)
    }
  }
}

export interface AccountDiscoverQueueData {
  address: string
  network: NetworkType
  userId: string
}
