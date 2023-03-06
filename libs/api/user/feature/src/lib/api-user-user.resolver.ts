import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { Invite } from '@pubkeyapp/api/invite/data-access'
import { Page } from '@pubkeyapp/api/page/data-access'
import { ApiUserUserService, User, UserRelation } from '@pubkeyapp/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver(() => User)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserUserResolver {
  constructor(private readonly service: ApiUserUserService) {}

  @Query(() => User, { nullable: true })
  user(@Args('username') username: string) {
    return this.service.user(username)
  }

  @Query(() => [Page], { nullable: true })
  userPages(@Args('username') username: string) {
    return this.service.userPages(username)
  }

  @Query(() => [User], { nullable: true })
  userFollowers(@Args('username') username: string) {
    return this.service.userFollowers(username)
  }

  @Query(() => [User], { nullable: true })
  userFollowing(@Args('username') username: string) {
    return this.service.userFollowing(username)
  }

  @Query(() => [Invite], { nullable: true })
  userInvites(@Args('username') username: string) {
    return this.service.userInvites(username)
  }

  @Mutation(() => User, { nullable: true })
  userFollow(@CtxUser() user: User, @Args('username') username: string) {
    return this.service.userFollow(user.id, username)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  userProfiles(@Args('username') username: string) {
    return this.service.userProfiles(username)
  }

  @Mutation(() => User, { nullable: true })
  userUnfollow(@CtxUser() user: User, @Args('username') username: string) {
    return this.service.userUnfollow(user.id, username)
  }

  @ResolveField(() => UserRelation, { nullable: true })
  relation(@CtxUser() user: User, @Parent() member: User) {
    return this.service.userRelation(user.id, member.username)
  }
}
