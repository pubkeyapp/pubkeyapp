import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { NetworkType } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserCollectionService, Collection } from '@pubkeyapp/api/collection/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserCollectionResolver {
  constructor(private readonly service: ApiUserCollectionService) {}

  @Query(() => Collection, { nullable: true })
  userGetCollection(
    @CtxUser() user: User,
    @Args({ name: 'network', type: () => NetworkType }) network: NetworkType,
    @Args('address') address: string,
  ) {
    return this.service.userGetCollection(user.id, network, address)
  }

  @Query(() => Collection, { nullable: true })
  userGetCollections(@CtxUser() user: User) {
    return this.service.userGetCollections(user.id)
  }
}
