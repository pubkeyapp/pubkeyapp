import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserInviteService, Invite } from '@pubkeyapp/api/invite/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserInviteFeatureResolver {
  constructor(private readonly service: ApiUserInviteService) {}

  @Query(() => Invite, { nullable: true })
  userInvite(@CtxUser() user: User) {
    return this.service.userInvite(user.id)
  }

  @Query(() => [Invite], { nullable: true })
  userInvites(@CtxUser() user: User) {
    return this.service.userInvites(user.id)
  }

  @Mutation(() => Invite, { nullable: true })
  userAcceptInvite(@CtxUser() user: User, @Args('code') code: string) {
    return this.service.userAcceptInvite(user.id, code)
  }
}
