import { Args, Query, Resolver } from '@nestjs/graphql'
import { IdentityProvider } from '@pubkeyapp/api/identity/data-access'
import { Invite } from '@pubkeyapp/api/invite/data-access'
import { Page } from '@pubkeyapp/api/page/data-access'
import { ApiPublicUserService, User } from '@pubkeyapp/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
export class ApiAnonUserResolver {
  constructor(private readonly service: ApiPublicUserService) {}

  @Query(() => User, { nullable: true })
  anonGetUser(@Args('username') username: string) {
    return this.service.anonGetUser(username)
  }

  @Query(() => User, { nullable: true })
  anonGetUserByIdentity(@Args('provider') provider: IdentityProvider, @Args('providerId') providerId: string) {
    return this.service.getUserByIdentity(provider, providerId)
  }

  @Query(() => [User], { nullable: true })
  anonGetUserFollowers(@Args('username') username: string) {
    return this.service.anonGetUserFollowers(username)
  }

  @Query(() => [User], { nullable: true })
  anonGetUserFollowing(@Args('username') username: string) {
    return this.service.anonGetUserFollowing(username)
  }

  @Query(() => [Invite], { nullable: true })
  anonGetUserInvites(@Args('username') username: string) {
    return this.service.anonGetUserInvites(username)
  }

  @Query(() => [Page], { nullable: true })
  anonGetUserPages(@Args('username') username: string) {
    return this.service.anonGetUserPages(username)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  anonGetUserProfiles(@Args('username') username: string) {
    return this.service.anonGetUserProfiles(username)
  }
}
