import { registerEnumType } from '@nestjs/graphql'
import { ClusterType } from '@prisma/client'

export enum CollectionMintQueue {
  CollectionMint = 'CollectionMint',
}

registerEnumType(CollectionMintQueue, { name: 'CollectionMintQueue' })

export enum CollectionMintTask {
  ProcessMintIndex = 'ProcessMintIndex',
  ProcessMintMeta = 'ProcessMintMeta',
  ProcessMintNormalize = 'ProcessMintNormalize',
}

export interface ProcessMintIndexInput {
  collectionId: string
  mint: string
  name: string
  cluster: ClusterType
}
