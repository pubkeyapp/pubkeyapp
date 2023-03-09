import { Injectable, Logger } from '@nestjs/common'
import { QueueType } from './entity/queue-type.enum'
import { Queue } from 'bull'
import { QueueCount } from './entity/queue-count.entity'
@Injectable()
export class ApiCoreQueueService {
  private readonly logger = new Logger(ApiCoreQueueService.name)

  queues = new Map<QueueType, Queue>()

  async getAllQueueInfo() {
    const result = []

    for (const [type, queue] of this.queues) {
      const info = this.getClientQueueInfo(type, queue)
      result.push(info)
    }

    return result
  }

  getQueueInfo(type: QueueType) {
    const queue = this.queues.get(type)
    return this.getClientQueueInfo(type, queue)
  }

  registerQueue(type: QueueType, queue: Queue) {
    this.logger.verbose(`Registering queue ${type}`)
    this.queues.set(type, queue)
  }

  private async getClientQueueInfo(type: QueueType, queue?: Queue) {
    const [isPaused, count] = await Promise.all([queue.isPaused(), queue.getJobCounts()])
    return {
      count: count as QueueCount,
      isPaused,
      name: queue.name,
      type,
    }
  }
}
