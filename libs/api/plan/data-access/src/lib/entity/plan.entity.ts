import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLDateTime } from 'graphql-scalars'
import { PlanFeature } from './plan-feature.entity'

@ObjectType()
export class Plan {
  @Field({ nullable: true })
  id: string
  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date
  @Field(() => GraphQLDateTime, { nullable: true })
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
