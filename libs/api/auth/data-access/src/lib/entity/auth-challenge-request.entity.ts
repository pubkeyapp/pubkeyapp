import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthChallengeRequest {
  @Field()
  challenge: string

  @Field()
  expiresAt: string
}
