import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserUserService, User, UserRelation, UserUpdateUserInput } from '@pubkeyapp/api/user/data-access'

@Resolver(() => User)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserUserResolver {
  constructor(private readonly service: ApiUserUserService) {}

  @Mutation(() => User, { nullable: true })
  userFollowUser(@CtxUser() user: User, @Args('username') username: string) {
    return this.service.userFollowUser(user.id, username)
  }

  @Mutation(() => User, { nullable: true })
  userUnfollowUser(@CtxUser() user: User, @Args('username') username: string) {
    return this.service.userUnfollowUser(user.id, username)
  }
  @Mutation(() => User, { nullable: true })
  userUpdateUser(@CtxUser() user: User, @Args('input') input: UserUpdateUserInput) {
    return this.service.userUpdateUser(user.id, input)
  }

  @ResolveField(() => UserRelation, { nullable: true })
  relation(@CtxUser() user: User, @Parent() member: User) {
    return this.service.userRelation(user.id, member.username)
  }
}
