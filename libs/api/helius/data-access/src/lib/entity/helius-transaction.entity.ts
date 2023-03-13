import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class HeliusTransaction {
  @Field({ nullable: true })
  id: string
  signature: string
}
