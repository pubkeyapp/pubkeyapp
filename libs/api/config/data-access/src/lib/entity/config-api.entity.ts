import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class ConfigApi {
  @ApiProperty()
  @Field()
  name: string
  @ApiProperty()
  @Field()
  version: string
  @ApiProperty()
  @Field()
  url: string
}
