import { UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Account, AdminListAccountInput, ApiAccountAdminService } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => Account)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminAccountResolver {
  constructor(private readonly service: ApiAccountAdminService) {}

  @Query(() => Account, { nullable: true })
  adminAccount(@CtxUser() user: User, @Args('accountId') accountId: string) {
    return this.service.adminAccount(user.id, accountId)
  }

  @Query(() => [Account], { nullable: true })
  adminAccounts(@CtxUser() user: User, @Args('input') input: AdminListAccountInput) {
    return this.service.adminAccounts(user.id, input)
  }
  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() account: Account) {
    const postfix = `?cluster=${account?.network?.toLowerCase()}`

    return `/account/${account.address}${postfix}`
  }
}
