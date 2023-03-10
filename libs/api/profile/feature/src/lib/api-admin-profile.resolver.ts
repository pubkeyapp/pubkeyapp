import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminGetProfilesInput,
  AdminUpdateProfileInput,
  ApiAdminProfileService,
  Profile,
} from '@pubkeyapp/api/profile/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminProfileResolver {
  constructor(private readonly service: ApiAdminProfileService) {}

  @Mutation(() => Profile, { nullable: true })
  adminDeleteProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.adminDeleteProfile(user.id, profileId)
  }

  @Query(() => Profile, { nullable: true })
  adminGetProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.adminGetProfile(user.id, profileId)
  }

  @Query(() => [Profile], { nullable: true })
  adminGetProfiles(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminGetProfilesInput,
      nullable: true,
    })
    input: AdminGetProfilesInput,
  ) {
    return this.service.adminGetProfiles(user.id, input)
  }

  @Mutation(() => Profile, { nullable: true })
  adminUpdateProfile(
    @CtxUser() user: User,
    @Args('profileId') profileId: string,
    @Args('input') input: AdminUpdateProfileInput,
  ) {
    return this.service.adminUpdateProfile(user.id, profileId, input)
  }
}
