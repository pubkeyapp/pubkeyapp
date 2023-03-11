import { Field, InputType, Int } from '@nestjs/graphql'
import { ProfileType } from '../entity/profile-type.enum'

@InputType()
export class AdminUpdateProfileInput {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  username: string

  @Field({ nullable: true })
  bio: string

  @Field({ nullable: true })
  avatarUrl: string

  @Field({ nullable: true })
  metaUrl: string

  @Field({ nullable: true })
  color: string

  @Field(() => Int, { nullable: true })
  followers: number

  @Field(() => Int, { nullable: true })
  following: number

  @Field(() => ProfileType, { nullable: true })
  type: ProfileType
}
