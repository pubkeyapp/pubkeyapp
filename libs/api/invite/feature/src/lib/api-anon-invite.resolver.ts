import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiPublicInviteService, Invite } from '@pubkeyapp/api/invite/data-access'

@Resolver()
export class ApiAnonInviteResolver {
  constructor(private readonly service: ApiPublicInviteService) {}

  @Query(() => Invite, { nullable: true })
  anonGetInvite(@Args('code') code: string) {
    return this.service.anonGetInvite(code)
  }
}
