import { registerEnumType } from '@nestjs/graphql'

export enum QueueType {
  AccountDiscover = 'AccountDiscover',
  AccountClose = 'AccountClose',
  CollectionMint = 'CollectionMint',
}

registerEnumType(QueueType, { name: 'QueueType' })
