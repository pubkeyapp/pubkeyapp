import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Queue } from 'bull'
import { QueueCount } from '../../entity/queue-count.entity'
import { QueueType } from '../../entity/queue-type.enum'

@Injectable()
export class ApiQueueCloseAccountService {
  private readonly logger = new Logger(ApiQueueCloseAccountService.name)
  constructor(@InjectQueue(QueueType.CloseAccount) readonly queue: Queue, readonly data: ApiCoreService) {
    this.queue.pause().then((res) => this.logger.debug(`Paused ${QueueType.CloseAccount} queue`))
  }

  async getQueueInfo() {
    const [isPaused, count] = await Promise.all([this.queue.isPaused(), this.queue.getJobCounts()])

    return {
      count: count as QueueCount,
      isPaused,
      name: this.queue.name,
      type: QueueType.CloseAccount,
    }
  }
}
