import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { ClusterType } from '@pubkeyapp/api/cluster/data-access'
import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class Mint {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date

  @ApiProperty()
  @Field({ nullable: true })
  address: string

  @ApiProperty()
  @Field({ nullable: true })
  name: string

  @Field(() => GraphQLJSON, { nullable: true })
  metadata: unknown

  @ApiProperty({ enum: ClusterType, enumName: 'ClusterType' })
  @Field(() => ClusterType, { nullable: true })
  cluster: ClusterType
}
