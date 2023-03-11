import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserSearchInput {
  @Field()
  query: string
}
