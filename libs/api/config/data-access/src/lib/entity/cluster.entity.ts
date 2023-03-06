import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Cluster as SolanaCluster } from '@pubkeyapp/solana'

import { ClusterType } from './cluster-type.enum'

@ObjectType()
export class Cluster implements SolanaCluster {
  @ApiProperty()
  @Field()
  id: string
  @ApiProperty()
  @Field()
  name: string
  @ApiProperty({ enum: ClusterType, enumName: 'ClusterType' })
  @Field(() => ClusterType)
  type: ClusterType
  @ApiProperty()
  @Field()
  endpoint: string
  @ApiProperty()
  @Field()
  explorerUrl: string
}
