import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthChallengeRequest {
  @Field()
  challenge: string

  @Field()
  expiresAt: string

  @Field()
  message: string
}
