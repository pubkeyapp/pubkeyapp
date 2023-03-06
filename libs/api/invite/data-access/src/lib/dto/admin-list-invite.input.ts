import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminListInviteInput {
  @Field({ nullable: true })
  ownerId?: string
}
