import { Field, InputType } from '@nestjs/graphql'
import { NetworkType } from '@pubkeyapp/api/account/data-access'

@InputType()
export class AdminGetCollectionsInput {
  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  name?: string
}
