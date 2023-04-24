import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

@InputType()
export class AdminGetCollectionMintsInput {
  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => String, { nullable: true })
  search?: string

  @Field(() => [TraitFilter], { nullable: true })
  traits?: TraitFilter[]
}

@InputType()
export class TraitFilter {
  @Field(() => String)
  key: string

  @Field(() => String)
  value: string
}

@ObjectType()
export class Trait {
  @Field(() => String)
  key: string

  @Field(() => String)
  value: string

  @Field(() => Int, { nullable: true })
  count?: number
}
