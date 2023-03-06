import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Queue } from 'bull'
import { QueueCount } from '../../entity/queue-count.entity'
import { QueueType } from '../../entity/queue-type.enum'

@Injectable()
export class ApiQueueParseBlockService {
  private readonly logger = new Logger(ApiQueueParseBlockService.name)
  constructor(@InjectQueue(QueueType.ParseBlock) readonly queue: Queue, readonly data: ApiCoreService) {
    this.queue.pause().then((res) => this.logger.debug(`Paused ${QueueType.ParseBlock} queue`))
  }

  async getQueueInfo() {
    const [isPaused, count] = await Promise.all([this.queue.isPaused(), this.queue.getJobCounts()])

    return {
      count: count as QueueCount,
      isPaused,
      name: this.queue.name,
      type: QueueType.ParseBlock,
    }
  }

  async process({ appKey, firstSlot, lastSlot }: { firstSlot: number; lastSlot: number; appKey: string }) {
    this.logger.log(`process ${appKey}, ${firstSlot}, ${lastSlot}`)
    await this.queue.add(
      'process',
      { firstSlot, lastSlot, appKey },
      { jobId: `slots-${firstSlot}-${lastSlot}`, removeOnComplete: true },
    )
  }

  async processSlots({ appKey, slots }: { appKey: string; slots: number[] }) {
    this.logger.log(`processSlots: ${slots.length} slots`)
    await this.queue.addBulk(
      slots.map((slot) => {
        return {
          name: 'process-slot',
          data: {
            appKey,
            slot,
          },
          opts: {
            jobId: `process-slot-${appKey}-${slot}`,
          },
        }
      }),
    )
  }
}
