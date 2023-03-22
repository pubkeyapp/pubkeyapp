import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Domain } from '@pubkeyapp/api/domain/data-access'
import { GraphQLDateTime } from 'graphql-scalars'
import { Page } from './page.entity'

@ObjectType()
export class PageDomain {
  @ApiProperty()
  @Field({ nullable: true })
  id: string
  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date
  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date
  @ApiProperty()
  @Field({ nullable: true })
  path: string

  @Field(() => Domain, { nullable: true })
  domain: Domain
  @Field(() => Page, { nullable: true })
  page: Page
}
