import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Page } from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { ProfileStatus } from './profile-status.enum'
import { ProfileType } from './profile-type.enum'

@ObjectType()
export class Profile {
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

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  username: string

  @ApiProperty()
  @Field({ nullable: true })
  bio: string

  @ApiProperty()
  @Field({ nullable: true })
  avatar: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  metaUrl: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  color: string

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

  @ApiProperty({ type: User, required: false, nullable: true })
  @Field(() => User, { nullable: true })
  owner?: User

  @ApiProperty({ type: Page, required: false, nullable: true })
  @Field(() => Page, { nullable: true })
  page?: Page
  @HideField()
  ownerId: string
}