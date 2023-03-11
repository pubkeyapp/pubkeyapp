import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateProfileInput {
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
}
