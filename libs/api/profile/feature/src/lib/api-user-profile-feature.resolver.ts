import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { Page } from '@pubkeyapp/api/page/data-access'
import { ApiUserProfileService, Profile, ProfileType, UserUpdateProfileInput } from '@pubkeyapp/api/profile/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserProfileFeatureResolver {
  constructor(private readonly service: ApiUserProfileService) {}

  @Mutation(() => Profile, { nullable: true })
  userCreateProfile(@CtxUser() user: User, @Args({ name: 'type', type: () => ProfileType }) type: ProfileType) {
    return this.service.userCreateProfile(user.id, type)
  }

  @Query(() => Profile, { nullable: true })
  userProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userProfile(user.id, profileId)
  }

  @Query(() => Page, { nullable: true })
  userProfilePage(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userProfilePage(user.id, profileId)
  }

  @Query(() => [Profile], { nullable: true })
  userProfiles(@CtxUser() user: User) {
    return this.service.userProfiles(user.id)
  }

  @Mutation(() => Profile, { nullable: true })
  userDeleteProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.userDeleteProfile(user.id, profileId)
  }

  @Mutation(() => Profile, { nullable: true })
  userUpdateProfile(
    @CtxUser() user: User,
    @Args('profileId') profileId: string,
    @Args('input') input: UserUpdateProfileInput,
  ) {
    return this.service.userUpdateProfile(user.id, profileId, input)
  }
}
