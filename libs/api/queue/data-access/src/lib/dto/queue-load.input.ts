import { Field, InputType } from '@nestjs/graphql'
import { QueueType } from '@pubkeyapp/api/core/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@InputType()
export class QueueLoadInput {
  @Field()
  serverAppId: string
  @Field(() => GraphQLJSON)
  payload: unknown
  @Field(() => QueueType)
  type: QueueType
}
