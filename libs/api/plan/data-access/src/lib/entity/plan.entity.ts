import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PlanFeature } from './plan-feature.entity'

@ObjectType()
export class Plan {
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  createdAt: Date
  @Field({ nullable: true })
  updatedAt: Date
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  description?: string
  @Field(() => Int, { nullable: true })
  priceMonth?: number
  @Field(() => Int, { nullable: true })
  priceYear?: number
  @Field({ nullable: true })
  currency?: string
  @Field({ nullable: true })
  recommended?: boolean
  @Field({ nullable: true })
  available?: boolean
  @Field(() => [PlanFeature], { nullable: true })
  features?: PlanFeature[]
}
