import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Account, ApiAnonAccountService, NetworkType } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserAccountResolver {
  constructor(private readonly service: ApiAnonAccountService) {}

  @Query(() => Account, { nullable: true })
  userGetAccount(
    @CtxUser() user: User,
    @Args({ name: 'network', type: () => NetworkType }) network: NetworkType,
    @Args('address') address: string,
    @Args({ name: 'refresh', type: () => Boolean, nullable: true }) refresh?: boolean,
  ) {
    return this.service.userGetAccount(user.id, network, address, refresh)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  userGetAccountHistory(
    @CtxUser() user: User,
    @Args({ name: 'network', type: () => NetworkType }) network: NetworkType,
    @Args('address') address: string,
  ) {
    return this.service.userGetAccountHistory(user.id, network, address)
  }
}
