import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiUserIdentityService, Identity } from '@pubkeyapp/api/identity/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => Identity)
export class ApiIdentityFieldResolver {
  constructor(private readonly service: ApiUserIdentityService) {}

  @ResolveField(() => User, { nullable: true })
  owner(@Parent() identity: Identity) {
    return this.service.core.getUserById(identity.ownerId)
  }
}
