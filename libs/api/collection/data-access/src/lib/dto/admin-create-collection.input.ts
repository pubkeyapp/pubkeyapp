import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '@pubkeyapp/api/cluster/data-access'

@InputType()
export class AdminCreateCollectionInput {
  @Field(() => ClusterType)
  cluster: ClusterType

  @Field()
  address: string

  @Field()
  name: string
}
