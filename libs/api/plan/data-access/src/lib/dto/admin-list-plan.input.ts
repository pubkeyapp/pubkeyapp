import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminListPlanInput {
  @Field({ nullable: true })
  id?: string
}
