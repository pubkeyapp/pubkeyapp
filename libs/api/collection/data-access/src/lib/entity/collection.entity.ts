import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { ClusterType } from '@pubkeyapp/api/cluster/data-access'
import { GraphQLDateTime } from 'graphql-scalars'
import { Mint } from './mint.entity'

@ObjectType()
export class Collection {
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

  @ApiProperty()
  @Field({ nullable: true })
  twitter: string

  @ApiProperty({ enum: ClusterType, enumName: 'ClusterType' })
  @Field(() => ClusterType, { nullable: true })
  cluster: ClusterType

  @Field(() => [Mint], { nullable: true })
  mints: Mint[]
}
