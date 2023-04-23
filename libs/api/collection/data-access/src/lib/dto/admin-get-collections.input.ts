import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '@pubkeyapp/api/cluster/data-access'

@InputType()
export class AdminGetCollectionsInput {
  @Field(() => ClusterType, { nullable: true })
  cluster?: ClusterType

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  name?: string
}
