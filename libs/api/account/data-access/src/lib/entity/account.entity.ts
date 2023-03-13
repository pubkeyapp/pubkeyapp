import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars'
import { AccountType } from './account-type.enum'
import { NetworkType } from './network-type.enum'

@ObjectType()
export class Account {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  discoveredAt?: Date

  @ApiProperty({ type: () => User, nullable: true })
  @Field(() => User, { nullable: true })
  discoveredBy?: User

  @ApiProperty({ type: () => Identity, nullable: true })
  @Field(() => Identity, { nullable: true })
  identity?: Identity

  @ApiProperty({ type: () => Account, nullable: true })
  @Field(() => Account, { nullable: true })
  owner?: Account

  @ApiProperty({ type: () => [Account], nullable: true })
  @Field(() => [Account], { nullable: true })
  tokens?: Account[]

  @ApiProperty()
  @Field({ nullable: true })
  name: string

  @ApiProperty()
  @Field({ nullable: true })
  program?: string
  @ApiProperty({ required: false, nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: unknown
  @ApiProperty()
  @Field({ nullable: true })
  address: string

  @ApiProperty({ enum: NetworkType, enumName: 'NetworkType' })
  @Field(() => NetworkType, { nullable: true })
  network: NetworkType

  @ApiProperty({ enum: AccountType, enumName: 'AccountType' })
  @Field(() => AccountType, { nullable: true })
  type: AccountType

  @ApiProperty({ type: () => User, nullable: true })
  @Field(() => User, { nullable: true })
  gumUser?: User
  gumProfile?: unknown
  gumProfileMeta?: unknown
}
