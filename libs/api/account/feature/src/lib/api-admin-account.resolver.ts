import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Account, AdminGetAccountsInput, ApiAdminAccountService } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminAccountResolver {
  constructor(private readonly service: ApiAdminAccountService) {}

  @Query(() => Account, { nullable: true })
  adminGetAccount(@CtxUser() user: User, @Args('accountId') accountId: string) {
    return this.service.adminGetAccount(user.id, accountId)
  }

  @Query(() => [Account], { nullable: true })
  adminGetAccounts(@CtxUser() user: User, @Args('input') input: AdminGetAccountsInput) {
    return this.service.adminGetAccounts(user.id, input)
  }
}
