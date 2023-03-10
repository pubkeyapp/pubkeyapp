import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { Setting } from '@pubkeyapp/api/config/data-access'
import { ApiCoreService, CoreUser } from '@pubkeyapp/api/core/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminSettingsResolver {
  constructor(private readonly core: ApiCoreService) {}

  @Query(() => [Setting], { nullable: true })
  adminGetSettings(@CtxUser() user: CoreUser) {
    return this.core.adminGetSettings(user)
  }

  @Mutation(() => Setting, { nullable: true })
  adminSetSetting(@CtxUser() user: CoreUser, @Args('key') key: string, @Args('value') value: string) {
    return this.core.adminSetSetting(user, key, value)
  }
}
