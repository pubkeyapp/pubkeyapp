import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { Job, JobStatus, Queue, QueueType } from '@pubkeyapp/api/core/data-access'
import { ApiQueueDataAccessService, QueueLoadInput } from '@pubkeyapp/api/queue/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiQueueAdminFeatureResolver {
  constructor(private readonly service: ApiQueueDataAccessService) {}

  @Query(() => Queue, { nullable: true })
  queue(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queue(user.id, type)
  }

  @Query(() => [Job], { nullable: true })
  queueJobs(
    @CtxUser() user: User,
    @Args('type', { type: () => QueueType }) type: QueueType,
    @Args('statuses', { type: () => [JobStatus] }) statuses: JobStatus[],
  ) {
    return this.service.queueJobs(user.id, type, statuses)
  }

  @Mutation(() => Queue, { nullable: true })
  queueLoad(@CtxUser() user: User, @Args('input') input: QueueLoadInput) {
    return this.service.queueLoad(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  queueClean(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queueClean(user.id, type)
  }

  @Mutation(() => Boolean, { nullable: true })
  queueDeleteJob(
    @CtxUser() user: User,
    @Args('type', { type: () => QueueType }) type: QueueType,
    @Args('jobId') jobId: string,
  ) {
    return this.service.queueDeleteJob(user.id, type, jobId)
  }

  @Mutation(() => Boolean, { nullable: true })
  queuePause(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queuePause(user.id, type)
  }

  @Mutation(() => Boolean, { nullable: true })
  queueResume(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queueResume(user.id, type)
  }

  @Query(() => [Queue], { nullable: true })
  queues(@CtxUser() user: User) {
    return this.service.queues(user.id)
  }
}
