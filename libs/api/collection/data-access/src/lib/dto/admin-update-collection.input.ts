import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCollectionInput {
  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  name?: string
}
