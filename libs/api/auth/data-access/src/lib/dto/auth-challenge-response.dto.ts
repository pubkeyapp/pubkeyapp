import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
export class ResponseChallengeOptions {
  @Field()
  @ApiProperty()
  challenge: string
  @Field()
  @ApiProperty()
  publicKey: string
  @Field()
  @ApiProperty()
  signature: string
}
