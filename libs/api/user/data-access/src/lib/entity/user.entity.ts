import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { Follow } from './follow.entity'
import { UserRole } from './user-role.enum'

@ObjectType()
export class User {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: string

  @Field({ nullable: true })
  updatedAt: string

  @ApiProperty()
  @Field({ nullable: true })
  name: string

  @ApiProperty()
  @Field({ nullable: true })
  username: string
  @ApiProperty()
  @Field({ nullable: true })
  bio: string

  @ApiProperty()
  @Field({ nullable: true })
  avatarUrl: string

  @ApiProperty()
  @Field({ nullable: true })
  metaUrl: string

  @ApiProperty()
  @Field({ nullable: true })
  profileUrl: string

  @ApiProperty()
  @Field({ nullable: true })
  publicKey: string

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  @Field(() => UserRole, { nullable: true })
  role: UserRole
  @HideField()
  @ApiProperty({ type: [Identity] })
  identities: Identity[]

  @Field(() => [Follow], { nullable: true })
  followers: Follow[]
  @ApiProperty({ type: 'integer' })
  @Field(() => Int, { nullable: true })
  followersCount: number

  @Field(() => [Follow], { nullable: true })
  following: Follow[]

  @ApiProperty({ type: 'integer' })
  @Field(() => Int, { nullable: true })
  followingCount: number
}
