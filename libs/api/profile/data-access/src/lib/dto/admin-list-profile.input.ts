import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminListProfileInput {
  @Field({ nullable: true })
  ownerId?: string
}
