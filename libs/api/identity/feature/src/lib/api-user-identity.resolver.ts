import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiPublicIdentityService, Identity } from '@pubkeyapp/api/identity/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserIdentityResolver {
  constructor(private readonly service: ApiPublicIdentityService) {}

  @Mutation(() => User, { nullable: true })
  userDeleteIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.core.userDeleteIdentity(user.id, identityId)
  }
}
