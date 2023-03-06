import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { QueueLoadInput } from './dto/queue-load.input'
import { JobStatus } from './entity/job-status.enum'
import { Job } from './entity/job.entity'
import { QueueType } from './entity/queue-type.enum'
import { Queue } from './entity/queue.entity'
import { ApiQueueCloseAccountService } from './queue/close-account/api-queue-close-account.service'
import { ApiQueueParseBlockService } from './queue/parse-block/api-queue-parse-block.service'

@Injectable()
export class ApiQueueDataAccessService {
  private readonly logger = new Logger(ApiQueueDataAccessService.name)
  constructor(
    private readonly data: ApiCoreService,
    private readonly closeAccountService: ApiQueueCloseAccountService,
    private readonly parseBlockService: ApiQueueParseBlockService,
  ) {}

  async queues(): Promise<Queue[]> {
    const queues = [this.closeAccountService, this.parseBlockService]

    this.logger.debug(`Get info for ${queues.length} queues`)

    return Promise.all(queues.map((queue) => queue.getQueueInfo()))
  }

  async queue(type: QueueType): Promise<Queue> {
    if (type === QueueType.CloseAccount) {
      return this.closeAccountService.getQueueInfo()
    }
    if (type === QueueType.ParseBlock) {
      return this.parseBlockService.getQueueInfo()
    }

    throw new NotFoundException(`Queue ${type} not found`)
  }

  async queueJobs(type: QueueType, statuses: JobStatus[]): Promise<Job[]> {
    if (type === QueueType.CloseAccount) {
      const jobs = await this.closeAccountService.queue.getJobs(statuses.map((status) => status.toLowerCase() as any))

      return jobs.map((job) => job.toJSON() as Job)
    }
    if (type === QueueType.ParseBlock) {
      const jobs = await this.parseBlockService.queue.getJobs(
        statuses.map((status) => status.toLowerCase() as any),
        0,
        1000,
      )

      return jobs.map((job) => job?.toJSON() as Job)
    }

    throw new NotFoundException(`Queue ${type} not found`)
  }

  async queueLoad(input: QueueLoadInput): Promise<Queue> {
    throw new NotFoundException(`Queue ${input.type} not found`)
  }

  async queueClean(type: QueueType): Promise<boolean> {
    if (type === QueueType.CloseAccount) {
      await this.closeAccountService.queue.obliterate()
      return true
    }
    if (type === QueueType.ParseBlock) {
      await this.parseBlockService.queue.clean(0, 'completed')
      await this.parseBlockService.queue.clean(0, 'active')
      await this.parseBlockService.queue.clean(0, 'paused')
      await this.parseBlockService.queue.obliterate()
      return true
    }

    throw new NotFoundException(`Queue ${type} not found`)
  }

  async queueDeleteJob(type: QueueType, jobId: string) {
    if (type === QueueType.CloseAccount) {
      const job = await this.closeAccountService.queue.getJob(jobId)
      await job.discard()
      await job.remove()

      return true
    }
    if (type === QueueType.ParseBlock) {
      const job = await this.parseBlockService.queue.getJob(jobId)
      await job.discard()
      await job.remove()

      return true
    }

    throw new NotFoundException(`Queue ${type} not found`)
  }

  async queuePause(type: QueueType): Promise<boolean> {
    if (type === QueueType.CloseAccount) {
      await this.closeAccountService.queue.pause()
      return true
    }
    if (type === QueueType.ParseBlock) {
      await this.parseBlockService.queue.pause()
      return true
    }

    throw new NotFoundException(`Queue ${type} not found`)
  }

  async queueResume(type: QueueType): Promise<boolean> {
    if (type === QueueType.CloseAccount) {
      await this.closeAccountService.queue.resume()
      return true
    }
    if (type === QueueType.ParseBlock) {
      await this.parseBlockService.queue.resume()
      return true
    }

    throw new NotFoundException(`Queue ${type} not found`)
  }

  async loadParseBlockQueue({ appKey, lastSlot, firstSlot }: { firstSlot: number; lastSlot: number; appKey: string }) {
    console.log('loadParseBlockQueue', { firstSlot, lastSlot, appKey })
    await this.parseBlockService.process({ firstSlot, lastSlot, appKey })
  }
}
