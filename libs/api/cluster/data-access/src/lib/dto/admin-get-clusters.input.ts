import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '@pubkeyapp/api/cluster/data-access'

@InputType()
export class AdminGetClustersInput {
  @Field(() => ClusterType, { nullable: true })
  type?: ClusterType

  @Field({ nullable: true })
  name?: string
}
