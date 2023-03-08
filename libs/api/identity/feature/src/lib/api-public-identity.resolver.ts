import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiPublicIdentityService, Identity } from '@pubkeyapp/api/identity/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => Identity)
export class ApiPublicIdentityResolver {
  constructor(private readonly service: ApiPublicIdentityService) {}

  @ResolveField(() => User, { nullable: true })
  owner(@Parent() identity: Identity) {
    return this.service.core.getUserById(identity.ownerId)
  }
}
