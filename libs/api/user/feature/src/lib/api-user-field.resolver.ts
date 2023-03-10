import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { CtxUser } from '@pubkeyapp/api/auth/data-access'
import { getAvatarUrl } from '@pubkeyapp/api/core/data-access'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { Profile } from '@pubkeyapp/api/profile/data-access'
import { ApiUserUserService, User, UserRelation } from '@pubkeyapp/api/user/data-access'

@Resolver(() => User)
export class ApiUserFieldResolver {
  constructor(private readonly service: ApiUserUserService) {}
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User) {
    return user.avatarUrl ? user.avatarUrl : getAvatarUrl(user.username)
  }

  @ResolveField(() => [Identity], { nullable: true })
  identities(@Parent() user: User) {
    return user.identities
  }

  @ResolveField(() => Profile, { nullable: true })
  profile(@Parent() user: User) {
    return user.profile
  }

  @ResolveField(() => [Profile], { nullable: true })
  profiles(@Parent() user: User) {
    return user.profiles
  }

  @ResolveField(() => String, { nullable: true })
  name(@Parent() user: User) {
    return user.name ? user.name : user.username
  }

  @ResolveField(() => String, { nullable: true })
  profileUrl(@Parent() user: User) {
    return `/u/${user.username}`
  }

  @ResolveField(() => UserRelation, { nullable: true })
  relation(@CtxUser() user: User, @Parent() member: User) {
    if (!user) return null
    return this.service.userRelation(user.id, member.username)
  }
}
