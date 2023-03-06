import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { AdminListInviteInput, ApiInviteAdminService } from '@pubkeyapp/api/invite/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { AdminCreateInviteInput, AdminUpdateInviteInput, Invite } from '@pubkeyapp/api/invite/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiInviteFeatureAdminResolver {
  constructor(private readonly service: ApiInviteAdminService) {}

  @Mutation(() => Invite, { nullable: true })
  adminCreateInvite(@CtxUser() user: User, @Args('input') input: AdminCreateInviteInput) {
    return this.service.adminCreateInvite(user.id, input)
  }

  @Mutation(() => Invite, { nullable: true })
  adminDeleteInvite(@CtxUser() user: User, @Args('inviteId') inviteId: string) {
    return this.service.adminDeleteInvite(user.id, inviteId)
  }

  @Query(() => [Invite], { nullable: true })
  adminInvites(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminListInviteInput,
      nullable: true,
    })
    input: AdminListInviteInput,
  ) {
    return this.service.adminInvites(user.id, input)
  }

  @Query(() => Invite, { nullable: true })
  adminInvite(@CtxUser() user: User, @Args('inviteId') inviteId: string) {
    return this.service.adminInvite(user.id, inviteId)
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
