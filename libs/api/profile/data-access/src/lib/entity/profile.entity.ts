import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { GraphQLDateTime } from 'graphql-scalars'
import { ProfileStatus } from './profile-status.enum'
import { ProfileType } from './profile-type.enum'

@ObjectType()
export class Profile {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

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
  metaUrl: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  color: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  private: boolean

  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  followers: number

  @ApiProperty({ type: 'integer', nullable: true, required: false })
  @Field(() => Int, { nullable: true })
  following: number

  @ApiProperty({ enum: ProfileType, enumName: 'ProfileType' })
  @Field(() => ProfileType, { nullable: true })
  type: ProfileType

  @ApiProperty({ enum: ProfileStatus, enumName: 'ProfileStatus' })
  @Field(() => ProfileStatus, { nullable: true })
  status: ProfileStatus

  owner?: unknown

  page?: unknown
  @HideField()
  ownerId: string
  @HideField()
  identities?: unknown[]

  gumProfile?: unknown

  gumProfileMeta?: unknown
}
