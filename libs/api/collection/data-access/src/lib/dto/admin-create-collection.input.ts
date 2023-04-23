import { Field, InputType } from '@nestjs/graphql'
import { NetworkType } from '@pubkeyapp/api/account/data-access'

@InputType()
export class AdminCreateCollectionInput {
  @Field(() => NetworkType)
  network: NetworkType

  @Field()
  address: string

  @Field()
  name: string
}
