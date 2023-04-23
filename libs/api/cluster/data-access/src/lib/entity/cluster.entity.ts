import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { ClusterStatus } from '@prisma/client'
import { GraphQLDateTime } from 'graphql-scalars'
import { ClusterType } from './cluster-type.enum'

@ObjectType()
export class Cluster {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date

  @ApiProperty()
  @Field({ nullable: true })
  endpointPrivate: string

  @ApiProperty()
  @Field({ nullable: true })
  endpointPublic: string

  @ApiProperty()
  @Field({ nullable: true })
  explorer: string

  @ApiProperty()
  @Field({ nullable: true })
  name: string

  @ApiProperty({ enum: ClusterStatus, enumName: 'ClusterStatus' })
  @Field(() => ClusterStatus, { nullable: true })
  status: ClusterStatus

  @ApiProperty({ enum: ClusterType, enumName: 'ClusterType' })
  @Field(() => ClusterType, { nullable: true })
  type: ClusterType
}
