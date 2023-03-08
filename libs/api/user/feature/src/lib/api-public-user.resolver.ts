import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { getAvatarUrl } from '@pubkeyapp/api/core/data-access'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { Invite } from '@pubkeyapp/api/invite/data-access'
import { Page } from '@pubkeyapp/api/page/data-access'
import { ApiPublicUserService, User } from '@pubkeyapp/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver(() => User)
export class ApiPublicUserResolver {
  constructor(private readonly service: ApiPublicUserService) {}

  @Query(() => User, { nullable: true })
  publicUser(@Args('username') username: string) {
    return this.service.publicUser(username)
  }

  @Query(() => [User], { nullable: true })
  publicUserFollowers(@Args('username') username: string) {
    return this.service.publicUserFollowers(username)
  }

  @Query(() => [User], { nullable: true })
  publicUserFollowing(@Args('username') username: string) {
    return this.service.publicUserFollowing(username)
  }

  @Query(() => [Invite], { nullable: true })
  publicUserInvites(@Args('username') username: string) {
    return this.service.publicUserInvites(username)
  }

  @Query(() => [Page], { nullable: true })
  publicUserPages(@Args('username') username: string) {
    return this.service.publicUserPages(username)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  publicUserProfiles(@Args('username') username: string) {
    return this.service.publicUserProfiles(username)
  }

  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl ? user.avatarUrl : getAvatarUrl(user.username)
  }

  @ResolveField(() => [Identity], { nullable: true })
  identities(@Parent() user: User) {
    return user.identities
  }

  @ResolveField(() => String, { nullable: true })
  name(@Parent() user: User) {
    return user.name ? user.name : user.username
  }

  @ResolveField(() => String, { nullable: true })
  profileUrl(@Parent() user: User) {
    return `/u/${user.username}`
  }
}
