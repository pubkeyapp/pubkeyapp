import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { CtxUser } from '@pubkeyapp/api/auth/data-access'
import { Profile } from '@pubkeyapp/api/profile/data-access'
import { ApiUserUserService, User, UserRelation } from '@pubkeyapp/api/user/data-access'

@Resolver(() => User)
export class ApiUserFieldResolver {
  constructor(private readonly service: ApiUserUserService) {}

  @ResolveField(() => String, { nullable: true })
  profileUrl(@Parent() user: User) {
    return `/u/${user.username}`
  }

  @ResolveField(() => UserRelation, { nullable: true })
  relation(@CtxUser() user: User, @Parent() member: User) {
    if (!user) return null
    return this.service.userRelation(user.id, member.username)
  }

  @ResolveField(() => Profile, { nullable: true })
  profile(@Parent() user: User) {
    return user?.profile ?? null
  }

  @ResolveField(() => [Profile], { nullable: true })
  profiles(@Parent() user: User) {
    return user?.profiles?.length ? user.profiles : []
  }
}
