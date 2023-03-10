import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminGetPagesInput {
  @Field({ nullable: true })
  ownerId?: string
}
