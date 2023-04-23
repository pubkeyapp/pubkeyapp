import { Field, InputType } from '@nestjs/graphql'
import { ClusterType } from '../entity/cluster-type.enum'

@InputType()
export class AdminCreateClusterInput {
  @Field()
  endpoint: string

  @Field()
  name: string

  @Field(() => ClusterType)
  type: ClusterType
}
