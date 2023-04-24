import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '../entity/cluster-type.enum'

@InputType()
export class AdminGetClustersInput {
  @Field(() => ClusterType, { nullable: true })
  type?: ClusterType

  @Field({ nullable: true })
  name?: string
}
