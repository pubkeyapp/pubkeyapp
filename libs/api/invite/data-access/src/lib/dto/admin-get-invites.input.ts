import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminGetInvitesInput {
  @Field({ nullable: true })
  ownerId?: string
}
