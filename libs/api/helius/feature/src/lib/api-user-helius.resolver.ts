import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { NetworkType } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserHeliusService, HeliusTransaction } from '@pubkeyapp/api/helius/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserHeliusResolver {
  constructor(private readonly service: ApiUserHeliusService) {}

  @Query(() => [HeliusTransaction])
  userGetHeliusTransactions(
    @CtxUser() user: User,
    @Args({ name: 'network', type: () => NetworkType }) network: NetworkType,
    @Args('address') address: string,
  ) {
    return this.service.userGetHeliusTransactions(user.id, network, address)
  }
}
