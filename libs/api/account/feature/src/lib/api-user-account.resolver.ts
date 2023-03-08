import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Account, ApiAnonAccountService, NetworkType } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver(() => Account)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserAccountResolver {
  constructor(private readonly service: ApiAnonAccountService) {}

  @Query(() => Account, { nullable: true })
  userAccount(
    @CtxUser() user: User,
    @Args({ name: 'network', type: () => NetworkType }) network: NetworkType,
    @Args('address') address: string,
  ) {
    return this.service.getAccount(user.id, network, address)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  userAccountHistory(
    @CtxUser() user: User,
    @Args({ name: 'network', type: () => NetworkType }) network: NetworkType,
    @Args('address') address: string,
  ) {
    return this.service.getAccountHistory(user.id, network, address)
  }
}
