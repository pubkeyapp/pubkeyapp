import { Field, ObjectType } from '@nestjs/graphql'
import { Account } from '@pubkeyapp/api/account/data-access'

@ObjectType()
export class ProfileVerification {
  @Field(() => Account, { nullable: true })
  gumProfile?: Account

  @Field(() => Account, { nullable: true })
  gumProfileMeta?: Account

  @Field(() => Account, { nullable: true })
  gumUser?: Account
}
