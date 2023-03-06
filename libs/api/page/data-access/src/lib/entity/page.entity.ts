import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '@pubkeyapp/api/user/data-access'
import { PageBlock } from './page-block.entity'
import { PageDomain } from './page-domain.entity'

@ObjectType()
export class Page {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: string

  @Field({ nullable: true })
  updatedAt: string

  @ApiProperty()
  @Field({ nullable: true })
  title: string

  @ApiProperty()
  @Field({ nullable: true })
  color: string

  @ApiProperty()
  @Field({ nullable: true })
  description?: string
  @ApiProperty()
  @Field({ nullable: true })
  viewUrl?: string
  @ApiProperty()
  @Field({ nullable: true })
  siteUrl?: string

  @ApiProperty({ type: [String] })
  @Field(() => [String], { nullable: true })
  urls?: string[]

  @ApiProperty({ type: User })
  @Field(() => User, { nullable: true })
  owner: User

  @ApiProperty({ type: () => [PageBlock] })
  @Field(() => [PageBlock], { nullable: true })
  blocks: PageBlock[]

  @Field(() => [PageDomain], { nullable: true })
  domains: PageDomain[]
}
