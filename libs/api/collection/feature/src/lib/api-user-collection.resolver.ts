import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ClusterType } from '@pubkeyapp/api/cluster/data-access'
import { ApiUserCollectionService, Collection } from '@pubkeyapp/api/collection/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserCollectionResolver {
  constructor(private readonly service: ApiUserCollectionService) {}

  @Query(() => Collection, { nullable: true })
  userGetCollection(
    @CtxUser() user: User,
    @Args({ name: 'cluster', type: () => ClusterType }) cluster: ClusterType,
    @Args('address') address: string,
  ) {
    return this.service.userGetCollection(user.id, cluster, address)
  }

  @Query(() => Collection, { nullable: true })
  userGetCollections(@CtxUser() user: User) {
    return this.service.userGetCollections(user.id)
  }
}
