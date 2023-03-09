import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class Setting {
  @ApiProperty()
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  default?: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  description?: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  key: string

  @ApiProperty({ nullable: true, required: false })
  @Field({ nullable: true })
  value?: string
}
