import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { Job, JobStatus, Queue, QueueType } from '@pubkeyapp/api/core/data-access'
import { ApiAdminQueueService } from '@pubkeyapp/api/queue/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminQueueResolver {
  constructor(private readonly service: ApiAdminQueueService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminCleanQueue(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.adminCleanQueue(user.id, type)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteQueueJob(
    @CtxUser() user: User,
    @Args('type', { type: () => QueueType }) type: QueueType,
    @Args('jobId') jobId: string,
  ) {
    return this.service.adminDeleteQueueJob(user.id, type, jobId)
  }

  @Query(() => Queue, { nullable: true })
  adminGetQueue(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.queue(user.id, type)
  }

  @Query(() => [Job], { nullable: true })
  adminGetQueueJobs(
    @CtxUser() user: User,
    @Args('type', { type: () => QueueType }) type: QueueType,
    @Args('statuses', { type: () => [JobStatus] }) statuses: JobStatus[],
  ) {
    return this.service.adminGetQueueJobs(user.id, type, statuses)
  }

  @Query(() => [Queue], { nullable: true })
  adminGetQueues(@CtxUser() user: User) {
    return this.service.adminGetQueues(user.id)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminPauseQueue(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.adminPauseQueue(user.id, type)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminResumeQueue(@CtxUser() user: User, @Args('type', { type: () => QueueType }) type: QueueType) {
    return this.service.adminResumeQueue(user.id, type)
  }
}
