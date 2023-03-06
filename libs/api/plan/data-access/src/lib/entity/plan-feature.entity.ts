import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PlanFeature {
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  createdAt: Date
  @Field({ nullable: true })
  updatedAt: Date
  @Field({ nullable: true })
  name?: string
  @Field(() => Int, { nullable: true })
  order?: number
}
