import { registerEnumType } from '@nestjs/graphql'

export enum QueueType {
  AccountDiscover = 'AccountDiscover',
  AccountClose = 'AccountClose',
  BlockParse = 'BlockParse',
}

registerEnumType(QueueType, { name: 'QueueType' })
