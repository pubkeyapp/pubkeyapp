import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdatePageInput {
  @Field({ nullable: true })
  title?: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  color?: string
}
