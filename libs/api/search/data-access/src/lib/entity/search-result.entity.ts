import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Account } from '@pubkeyapp/api/account/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@ObjectType()
export class SearchResult {
  @ApiProperty({ nullable: true, required: false })
  @Field(() => [Account], { nullable: true })
  accounts?: Account[]

  @ApiProperty({ nullable: true, required: false })
  @Field(() => [User], { nullable: true })
  users?: User[]
}
