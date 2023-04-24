import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminCreateClusterInput,
  AdminGetClustersInput,
  AdminUpdateClusterInput,
  ApiAdminClusterService,
  Cluster,
} from '@pubkeyapp/api/cluster/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminClusterResolver {
  constructor(private readonly service: ApiAdminClusterService) {}

  @Mutation(() => Cluster, { nullable: true })
  adminCreateCluster(@CtxUser() user: User, @Args('input') input: AdminCreateClusterInput) {
    return this.service.adminCreateCluster(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.adminDeleteCluster(user.id, clusterId)
  }

  @Query(() => Cluster, { nullable: true })
  adminGetCluster(@CtxUser() user: User, @Args('clusterId') clusterId: string) {
    return this.service.adminGetCluster(user.id, clusterId)
  }

  @Query(() => [Cluster], { nullable: true })
  adminGetClusters(@CtxUser() user: User, @Args('input') input: AdminGetClustersInput) {
    return this.service.adminGetClusters(user.id, input)
  }

  @Mutation(() => Cluster, { nullable: true })
  adminUpdateCluster(
    @CtxUser() user: User,
    @Args('clusterId') clusterId: string,
    @Args('input') input: AdminUpdateClusterInput,
  ) {
    return this.service.adminUpdateCluster(user.id, clusterId, input)
  }
}
