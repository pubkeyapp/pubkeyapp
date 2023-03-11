import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { GraphQLJSON } from 'graphql-scalars'
import { PageBlockType } from './page-block-type.enum'
import { Page } from './page.entity'

@ObjectType()
export class PageBlock {
  @ApiProperty()
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  createdAt: Date
  @Field({ nullable: true })
  updatedAt: Date
  @ApiProperty()
  @Field({ nullable: true })
  name: string
  @ApiProperty()
  @Field(() => Int, { nullable: true })
  order: number

  @ApiProperty({ required: false, nullable: true })
  @Field(() => GraphQLJSON, { nullable: true })
  data: unknown
  @ApiProperty({ enum: PageBlockType, enumName: 'PageBlockType' })
  @Field(() => PageBlockType, { nullable: true })
  type: PageBlockType
  @Field(() => Page, { nullable: true })
  page: Page
}
