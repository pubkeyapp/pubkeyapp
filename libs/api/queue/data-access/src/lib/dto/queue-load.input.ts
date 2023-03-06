import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'
import { QueueType } from '../entity/queue-type.enum'

@InputType()
export class QueueLoadInput {
  @Field()
  serverAppId: string
  @Field(() => GraphQLJSON)
  payload: unknown
  @Field(() => QueueType)
  type: QueueType
}
