import { UseGuards } from '@nestjs/common'
import { Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard } from '@pubkeyapp/api/auth/data-access'
import { Cluster } from '@pubkeyapp/api/cluster/data-access'

@Resolver(() => Cluster)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiClusterFieldResolver {}
