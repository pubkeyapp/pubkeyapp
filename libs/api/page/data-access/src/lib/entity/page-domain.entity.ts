import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Domain } from '@pubkeyapp/api/domain/data-access'
import { Page } from './page.entity'

@ObjectType()
export class PageDomain {
  @ApiProperty()
  @Field({ nullable: true })
  id: string
  @Field({ nullable: true })
  createdAt: string
  @Field({ nullable: true })
  updatedAt: string
  @ApiProperty()
  @Field({ nullable: true })
  path: string

  @Field(() => Domain, { nullable: true })
  domain: Domain
  @Field(() => Page, { nullable: true })
  page: Page
}
