import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { getAvatarUrl } from '@pubkeyapp/api/core/data-access'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { ApiPublicProfileService, Profile } from '@pubkeyapp/api/profile/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => Profile)
export class ApiProfileFieldResolver {
  constructor(private readonly service: ApiPublicProfileService) {}

  @ResolveField(() => [Identity], { nullable: true })
  identities(@Parent() profile: Profile) {
    return profile.identities ?? []
  }

  @ResolveField(() => User, { nullable: true })
  owner(@Parent() profile: Profile) {
    return this.service.core.getUserById(profile.ownerId)
  }

  @ResolveField(() => String, { nullable: true })
  avatar(@Parent() profile: Profile) {
    return profile.avatar ? profile.avatar : getAvatarUrl(profile.username ?? profile.ownerId)
  }
}
