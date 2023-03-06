import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminCreateInviteInput {
  @Field({ nullable: true })
  expiresAt?: string

  @Field({ nullable: true })
  ownerId?: string

  @Field(() => Int, { nullable: true })
  maxUses?: number
}
