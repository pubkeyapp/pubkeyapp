import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLDateTime } from 'graphql-scalars'

@ObjectType()
export class PlanFeature {
  @Field({ nullable: true })
  id: string
  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date
  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date
  @Field({ nullable: true })
  name?: string
  @Field(() => Int, { nullable: true })
  order?: number
}
