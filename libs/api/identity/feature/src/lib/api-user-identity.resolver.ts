import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserIdentityService, Identity, IdentityProvider } from '@pubkeyapp/api/identity/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserIdentityResolver {
  constructor(private readonly service: ApiUserIdentityService) {}

  @Mutation(() => User, { nullable: true })
  userLinkIdentity(
    @CtxUser() user: User,
    @Args({ name: 'provider', type: () => IdentityProvider }) provider: IdentityProvider,
    @Args('providerId') providerId: string,
  ) {
    return this.service.userLinkIdentity(user.id, provider, providerId)
  }

  @Mutation(() => User, { nullable: true })
  userDeleteIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.userDeleteIdentity(user.id, identityId)
  }

  @Query(() => Identity, { nullable: true })
  userGetIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.userGetIdentity(user.id, identityId)
  }

  @Query(() => [Identity], { nullable: true })
  userGetIdentities(@CtxUser() user: User) {
    return this.service.userGetIdentities(user.id)
  }

  @Mutation(() => Identity, { nullable: true })
  userSyncIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.userSyncIdentity(user.id, identityId)
  }
}
