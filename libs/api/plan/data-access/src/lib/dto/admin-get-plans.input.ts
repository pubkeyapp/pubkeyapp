import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminGetPlansInput {
  @Field({ nullable: true })
  id?: string
}
