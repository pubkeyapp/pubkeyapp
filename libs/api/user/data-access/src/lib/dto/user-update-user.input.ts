import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateUserInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  bio?: string
}
