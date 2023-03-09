import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminListProfileInput,
  AdminUpdateProfileInput,
  ApiAdminProfileService,
  Profile,
} from '@pubkeyapp/api/profile/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminProfileFeatureResolver {
  constructor(private readonly service: ApiAdminProfileService) {}

  @Mutation(() => Profile, { nullable: true })
  adminDeleteProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.adminDeleteProfile(user.id, profileId)
  }

  @Query(() => [Profile], { nullable: true })
  adminProfiles(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminListProfileInput,
      nullable: true,
    })
    input: AdminListProfileInput,
  ) {
    return this.service.adminProfiles(user.id, input)
  }

  @Query(() => Profile, { nullable: true })
  adminProfile(@CtxUser() user: User, @Args('profileId') profileId: string) {
    return this.service.adminProfile(user.id, profileId)
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
