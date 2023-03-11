import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { PageType } from '../entity/page-type.enum'

@InputType()
export class AdminCreatePageInput {
  @Field()
  title: string
  @Field()
  description: string
  @Field({ nullable: true })
  ownerId?: string
  @Field()
  profileId: string
  @Field({ nullable: true })
  color?: string
  @ApiProperty({ enum: PageType, enumName: 'PageType' })
  @Field(() => PageType, { nullable: true })
  type: PageType
}
