import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule, QueueType } from '@pubkeyapp/api/core/data-access'
import { ApiAdminCollectionService } from './api-admin-collection.service'
import { ApiUserCollectionService } from './api-user-collection.service'
import { ApiCollectionQueueService } from './queue/api-collection-queue.service'
import { CollectionMintQueueProcessor } from './queue/collection-mint/collection-mint-queue.processor'

@Module({
  imports: [ApiCoreDataAccessModule, BullModule.registerQueue({ name: QueueType.CollectionMint })],
  providers: [
    ApiAdminCollectionService,
    ApiUserCollectionService,
    ApiCollectionQueueService,
    CollectionMintQueueProcessor,
  ],
  exports: [ApiAdminCollectionService, ApiUserCollectionService],
})
export class ApiCollectionDataAccessModule {}
