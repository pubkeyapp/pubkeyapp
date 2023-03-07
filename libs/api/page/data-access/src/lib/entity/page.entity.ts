import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '@pubkeyapp/api/user/data-access'
import { PageBlock } from './page-block.entity'
import { PageDomain } from './page-domain.entity'
import { PageStatus } from './page-status.enum'
import { PageType } from './page-type.enum'

@ObjectType()
export class Page {
  @ApiProperty({ required: false, nullable: true })
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: string

  @Field({ nullable: true })
  updatedAt: string
  @ApiProperty({ enum: PageStatus, enumName: 'PageStatus' })
  @Field(() => PageStatus, { nullable: true })
  status: PageStatus
  @ApiProperty({ enum: PageType, enumName: 'PageType' })
  @Field(() => PageType, { nullable: true })
  type: PageType

  @ApiProperty({ required: false, nullable: true })
  @Field({ nullable: true })
  title?: string

  @ApiProperty({ required: false, nullable: true })
  @Field({ nullable: true })
  color: string

  @ApiProperty({ required: false, nullable: true })
  @Field({ nullable: true })
  description?: string
  @ApiProperty({ required: false, nullable: true })
  @Field({ nullable: true })
  viewUrl?: string
  @ApiProperty({ required: false, nullable: true })
  @Field({ nullable: true })
  siteUrl?: string

  @ApiProperty({ type: [String], required: false, nullable: true })
  @Field(() => [String], { nullable: true })
  urls?: string[]

  @ApiProperty({ type: User, required: false, nullable: true })
  @Field(() => User, { nullable: true })
  owner?: User

  @ApiProperty({ type: () => [PageBlock], required: false, nullable: true })
  @Field(() => [PageBlock], { nullable: true })
  blocks: PageBlock[]

  @Field(() => [PageDomain], { nullable: true })
  domains: PageDomain[]
}
