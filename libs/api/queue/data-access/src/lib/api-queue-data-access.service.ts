import { Injectable, NotFoundException } from '@nestjs/common'
import { ApiCoreService, Job, JobStatus, Queue, QueueType } from '@pubkeyapp/api/core/data-access'
import { QueueLoadInput } from './dto/queue-load.input'

@Injectable()
export class ApiQueueDataAccessService {
  constructor(private readonly core: ApiCoreService) {}

  async queues(adminId: string): Promise<Queue[]> {
    await this.core.ensureUserAdmin(adminId)
    return this.core.queue.getAllQueueInfo()
  }

  async queue(adminId: string, type: QueueType): Promise<Queue> {
    await this.core.ensureUserAdmin(adminId)
    return this.core.queue.getQueueInfo(type)
  }

  async queueJobs(adminId: string, type: QueueType, statuses: JobStatus[]): Promise<Job[]> {
    await this.core.ensureUserAdmin(adminId)
    const queue = this.core.queue.queues.get(type)
    const jobs = await queue.getJobs(
      statuses.map((status) => status.toLowerCase() as any),
      0,
      1000,
    )
    return jobs.map((job) => job.toJSON() as Job)
  }

  async queueLoad(adminId: string, input: QueueLoadInput): Promise<Queue> {
    await this.core.ensureUserAdmin(adminId)
    throw new NotFoundException(`Queue ${input.type} not found`)
  }

  async queueClean(adminId: string, type: QueueType): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    await this.core.queue.queues.get(type).clean(0, 'active')
    await this.core.queue.queues.get(type).obliterate()
    return true
  }

  async queueDeleteJob(adminId: string, type: QueueType, jobId: string) {
    await this.core.ensureUserAdmin(adminId)
    const job = await this.core.queue.queues.get(type).getJob(jobId)
    await job.discard()
    await job.remove()
  }

  async queuePause(adminId: string, type: QueueType): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    await this.core.queue.queues.get(type).pause()
    return true
  }

  async queueResume(adminId: string, type: QueueType): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    await this.core.queue.queues.get(type).resume()
    return true
  }
}
