import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreatePageInput {
  @Field()
  title: string
  @Field()
  description: string
  @Field({ nullable: true })
  ownerId?: string
  @Field({ nullable: true })
  color?: string
}
