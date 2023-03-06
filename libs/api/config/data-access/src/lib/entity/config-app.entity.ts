import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class ConfigApp {
  @ApiProperty()
  @Field()
  description: string
  @ApiProperty()
  @Field()
  name: string
  @ApiProperty()
  @Field()
  url: string
}
