import { Field, InputType } from '@nestjs/graphql'
import { AccountType } from '../entity/account-type.enum'
import { NetworkType } from '../entity/network-type.enum'

@InputType()
export class AdminListAccountInput {
  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType
  @Field(() => AccountType, { nullable: true })
  type?: AccountType

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  program?: string

  @Field({ nullable: true })
  name?: string
}
