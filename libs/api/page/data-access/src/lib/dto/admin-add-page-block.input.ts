import { Field, InputType, Int } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'
import { PageBlockType } from '../entity/page-block-type.enum'

@InputType()
export class AdminAddPageBlockInput {
  @Field(() => Int, { nullable: true })
  order: number
  @Field(() => GraphQLJSON, { nullable: true })
  data: any
  @Field(() => PageBlockType, { nullable: true })
  type: PageBlockType
}
