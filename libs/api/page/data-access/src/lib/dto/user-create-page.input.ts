import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreatePageInput {
  @Field({ nullable: true })
  profileId?: string
}
