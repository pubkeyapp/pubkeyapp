import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminGetCollectionMintsInput {
  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => String, { nullable: true })
  search?: string

  @Field(() => [Trait], { nullable: true })
  traits?: Trait[]
}

@InputType()
export class Trait {
  @Field(() => String)
  key: string

  @Field(() => String)
  value: string
}
