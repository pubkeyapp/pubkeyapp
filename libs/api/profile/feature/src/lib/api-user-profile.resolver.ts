import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { Page } from '@pubkeyapp/api/page/data-access'
import { ApiUserProfileService, Profile, ProfileType, UserUpdateProfileInput } from '@pubkeyapp/api/profile/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserProfileResolver {
  constructor(private readonly service: ApiUserProfileService) {}

  @Mutation(() => Profile, { nullable: true })
  userCreateProfile(@CtxUser() user: User, @Args({ name: 'type', type: () => ProfileType }) type: ProfileType) {
    return this.service.userCreateProfile(user.id, type)
  }

  @Query(() => Profile, { nullable: true })
  userGetProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userGetProfile(user.id, profileId)
  }

  @Query(() => Page, { nullable: true })
  userGetProfilePage(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userGetProfilePage(user.id, profileId)
  }

  @Query(() => [Profile], { nullable: true })
  userGetProfiles(@CtxUser() user: User) {
    return this.service.userGetProfiles(user.id)
  }

  @Mutation(() => Profile, { nullable: true })
  userDeleteProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userDeleteProfile(user.id, profileId)
  }

  @Mutation(() => Profile, { nullable: true })
  userSyncProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userSyncProfile(user.id, profileId)
  }

  @Mutation(() => Profile, { nullable: true })
  userVerifyProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userVerifyProfile(user.id, profileId)
  }

  @Mutation(() => Profile, { nullable: true })
  userSetDefaultProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userSetDefaultProfile(user.id, profileId)
  }

  @Mutation(() => Profile, { nullable: true })
  userUpdateProfile(
    @CtxUser() user: User,
    @Args('profileId') profileId: string,
    @Args('input') input: UserUpdateProfileInput,
  ) {
    return this.service.userUpdateProfile(user.id, profileId, input)
  }

  @Mutation(() => Profile, { nullable: true })
  userLinkProfileIdentity(
    @CtxUser() user: User,
    @Args('profileId') profileId: string,
    @Args('identityId') identityId: string,
  ) {
    return this.service.userLinkProfileIdentity(user.id, profileId, identityId)
  }

  @Mutation(() => Profile, { nullable: true })
  userUnlinkProfileIdentity(
    @CtxUser() user: User,
    @Args('profileId') profileId: string,
    @Args('identityId') identityId: string,
  ) {
    return this.service.userUnlinkProfileIdentity(user.id, profileId, identityId)
  }
}
