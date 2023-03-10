import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { AdminGetInvitesInput, ApiAdminInviteService } from '@pubkeyapp/api/invite/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { AdminCreateInviteInput, AdminUpdateInviteInput, Invite } from '@pubkeyapp/api/invite/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminInviteResolver {
  constructor(private readonly service: ApiAdminInviteService) {}

  @Mutation(() => Invite, { nullable: true })
  adminCreateInvite(@CtxUser() user: User, @Args('input') input: AdminCreateInviteInput) {
    return this.service.adminCreateInvite(user.id, input)
  }

  @Mutation(() => Invite, { nullable: true })
  adminDeleteInvite(@CtxUser() user: User, @Args('inviteId') inviteId: string) {
    return this.service.adminDeleteInvite(user.id, inviteId)
  }

  @Query(() => [Invite], { nullable: true })
  adminGetInvites(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminGetInvitesInput,
      nullable: true,
    })
    input: AdminGetInvitesInput,
  ) {
    return this.service.adminGetInvites(user.id, input)
  }

  @Query(() => Invite, { nullable: true })
  adminGetInvite(@CtxUser() user: User, @Args('inviteId') inviteId: string) {
    return this.service.adminGetInvite(user.id, inviteId)
  }

  @Mutation(() => Invite, { nullable: true })
  adminUpdateInvite(
    @CtxUser() user: User,
    @Args('inviteId') inviteId: string,
    @Args('input') input: AdminUpdateInviteInput,
  ) {
    return this.service.adminUpdateInvite(user.id, inviteId, input)
  }
}
