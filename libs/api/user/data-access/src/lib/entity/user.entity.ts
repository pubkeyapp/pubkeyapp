import { GraphQLDateTime } from 'graphql-scalars'
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { Follow } from './follow.entity'
import { UserRole } from './user-role.enum'
import { UserStatus } from './user-status.enum'

@ObjectType()
export class User {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  pid: number

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date

  @ApiProperty()
  @Field({ nullable: true })
  name: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  username: string
  @ApiProperty()
  @Field({ nullable: true })
  bio: string

  @ApiProperty()
  @Field({ nullable: true })
  avatarUrl: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  metaUrl?: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  profileUrl?: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  publicKey?: string

  @ApiProperty({ enum: UserRole, enumName: 'UserRole', nullable: true, required: false })
  @Field(() => UserRole, { nullable: true })
  role: UserRole
  @ApiProperty({ enum: UserStatus, enumName: 'UserStatus', nullable: true, required: false })
  @Field(() => UserStatus, { nullable: true })
  status: UserStatus
  @HideField()
  @ApiProperty({ type: [Identity], nullable: true, required: false })
  identities?: Identity[]

  @Field(() => [Follow], { nullable: true })
  followers?: Follow[]
  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  followersCount?: number

  @Field(() => [Follow], { nullable: true })
  following?: Follow[]

  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  followingCount?: number

  @HideField()
  profile: unknown

  @HideField()
  profiles?: unknown[]
}
