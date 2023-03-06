import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminListPageInput {
  @Field({ nullable: true })
  ownerId?: string
}
