import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminUpdateInviteInput {
  @Field({ nullable: true })
  expiresAt?: Date

  @Field(() => Int, { nullable: true })
  maxUses?: number
}
