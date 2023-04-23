import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ClusterType } from '@pubkeyapp/api/cluster/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserClusterService, Cluster } from '@pubkeyapp/api/cluster/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserClusterResolver {
  constructor(private readonly service: ApiUserClusterService) {}

  @Query(() => Cluster, { nullable: true })
  userGetCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.userGetCluster(user.id, clusterId)
  }

  @Query(() => Cluster, { nullable: true })
  userGetClusters(@CtxUser() user: User) {
    return this.service.userGetClusters(user.id)
  }
}
