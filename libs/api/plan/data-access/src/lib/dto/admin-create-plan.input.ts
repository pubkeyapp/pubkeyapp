import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminCreatePlanInput {
  @Field()
  name: string
  @Field({ nullable: true })
  description: string
  @Field(() => Int, { nullable: true })
  priceMonth: number
  @Field(() => Int, { nullable: true })
  priceYear: number
  @Field({ nullable: true })
  currency: string
  @Field({ nullable: true })
  recommended?: boolean
  @Field({ nullable: true })
  active?: boolean
}
