import { ApiPublicInviteService, Invite } from '@pubkeyapp/api/invite/data-access'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => Invite)
export class ApiPublicInviteFeatureResolver {
  constructor(private readonly service: ApiPublicInviteService) {}

  @Query(() => Invite, { nullable: true })
  publicInvite(@Args('code') code: string) {
    return this.service.publicInvite(code)
  }

  @ResolveField(() => String, { nullable: true })
  inviteUrl(@Parent() invite: Invite) {
    return this.service.getInviteUrl(invite)
  }

  @ResolveField(() => Boolean, { nullable: true })
  isExpired(@Parent() invite: Invite) {
    return this.service.isExpired(invite)
  }

  @ResolveField(() => Boolean, { nullable: true })
  isUsedUp(@Parent() invite: Invite) {
    return this.service.isUsedUp(invite)
  }
}
