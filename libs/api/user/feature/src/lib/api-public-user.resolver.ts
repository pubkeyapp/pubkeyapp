import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { getAvatarUrl } from '@pubkeyapp/api/core/data-access'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => User)
export class ApiPublicUserResolver {
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
