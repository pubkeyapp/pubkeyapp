import { registerEnumType } from '@nestjs/graphql'

export enum QueueType {
  CloseAccount = 'CloseAccount',
  ParseBlock = 'ParseBlock',
}

registerEnumType(QueueType, { name: 'QueueType' })
