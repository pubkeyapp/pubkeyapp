import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  ApiQueueDataAccessService,
  Job,
  JobStatus,
  Queue,
  QueueLoadInput,
  QueueType,
} from '@pubkeyapp/api/queue/data-access'

@Resolver()
export class ApiQueueAdminFeatureResolver {
  constructor(private readonly service: ApiQueueDataAccessService) {}

  @Query(() => Queue, { nullable: true })
  queue(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queue(type)
  }

  @Query(() => [Job], { nullable: true })
  queueJobs(
    @Args('type', { type: () => QueueType }) type: QueueType,
    @Args('statuses', { type: () => [JobStatus] }) statuses: JobStatus[],
  ) {
    return this.service.queueJobs(type, statuses)
  }

  @Mutation(() => Queue, { nullable: true })
  queueLoad(@Args('input') input: QueueLoadInput) {
    return this.service.queueLoad(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  queueClean(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queueClean(type)
  }

  @Mutation(() => Boolean, { nullable: true })
  queueDeleteJob(@Args('type', { type: () => QueueType }) type: QueueType, @Args('jobId') jobId: string) {
    return this.service.queueDeleteJob(type, jobId)
  }

  @Mutation(() => Boolean, { nullable: true })
  queuePause(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queuePause(type)
  }

  @Mutation(() => Boolean, { nullable: true })
  queueResume(@Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queueResume(type)
  }

  @Query(() => [Queue], { nullable: true })
  queues() {
    return this.service.queues()
  }
}
