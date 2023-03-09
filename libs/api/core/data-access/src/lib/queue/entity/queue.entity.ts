import { Field, ObjectType } from '@nestjs/graphql'
import { QueueType } from '@pubkeyapp/api/core/data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { QueueCount } from './queue-count.entity'


@ObjectType()
export class Queue {
  @Field(() => QueueType)
  type: QueueType
  @Field()
  name: string
  @Field(() => QueueCount, { nullable: true })
  count?: QueueCount
  @Field(() => GraphQLJSON, { nullable: true })
  info?: unknown
  @Field({ nullable: true })
  isPaused?: boolean
}
