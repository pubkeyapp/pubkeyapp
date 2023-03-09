import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { NetworkType } from '@prisma/client'
import { ApiCoreService, QueueType } from '@pubkeyapp/api/core/data-access'
import { Queue } from 'bull'
import { AccountDiscoverQueueData } from './account-discover/account-discover-queue.processor'

@Injectable()
export class ApiAccountQueueService {
  private readonly logger = new Logger(ApiAccountQueueService.name)
  constructor(
    @InjectQueue(QueueType.AccountClose) readonly close: Queue,
    @InjectQueue(QueueType.AccountDiscover) readonly discover: Queue,
    readonly core: ApiCoreService,
  ) {
    this.core.queue.registerQueue(QueueType.AccountClose, close)
    this.core.queue.registerQueue(QueueType.AccountDiscover, discover)
  }

  async processAccountDiscover({ userId, address, network }: AccountDiscoverQueueData) {
    const job = await this.discover.add(
      QueueType.AccountDiscover,
      {
        userId,
        address,
        network,
      },
      {
        jobId: `${address}-${network}`,
      },
    )
    this.logger.verbose(`Added ${address} to ${network} to ${QueueType.AccountDiscover} queue with id ${job.id}`)
  }
}
