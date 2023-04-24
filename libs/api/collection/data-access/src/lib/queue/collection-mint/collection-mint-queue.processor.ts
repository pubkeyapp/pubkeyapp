import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { QueueType } from '@pubkeyapp/api/core/data-access'
import { DoneCallback, Job } from 'bull'
import { ApiAdminCollectionService } from '../../api-admin-collection.service'
import { Mint } from '../../entity/mint.entity'
import { CollectionMintTask, ProcessMintIndexInput } from '../api-collection-queue.helper'

@Processor(QueueType.CollectionMint)
export class CollectionMintQueueProcessor {
  private readonly logger = new Logger(CollectionMintQueueProcessor.name)

  constructor(private readonly admin: ApiAdminCollectionService) {}
  @Process({ name: CollectionMintTask.ProcessMintMeta, concurrency: 4 })
  async handleProcessMintMeta(job: Job<{ mint: Mint }>, cb: DoneCallback) {
    try {
      const result = await this.admin.handleProcessMintMeta(job.data.mint)
      this.logger.verbose(`Processed ${job.data.mint.cluster} / ${job.data.mint.name} / ${job.data.mint.address}`)
      cb(null, { success: true, data: job.data, result })
    } catch (e) {
      this.logger.error(e)
      cb(e)
      return
    }
  }

  @Process({ name: CollectionMintTask.ProcessMintNormalize, concurrency: 32 })
  async handleProcessMintNormalize(job: Job<{ mint: Mint }>, cb: DoneCallback) {
    try {
      const result = await this.admin.handleProcessMintNormalize(job.data)
      // this.logger.verbose(`Processed ${job.data.mint.cluster} / ${job.data.mint.name} / ${job.data.mint.cluster}`)
      cb(null, { success: true, data: job.data, result })
    } catch (e) {
      this.logger.error(`Error processing ${job.data.mint} / ${job.data.mint.name} / ${job.data.mint.cluster}`)
      this.logger.error(e)
      cb(e)
      return
    }
  }

  @Process({ name: CollectionMintTask.ProcessMintIndex, concurrency: 4 })
  async handleProcessMintIndex(job: Job<ProcessMintIndexInput>, cb: DoneCallback) {
    try {
      const result = await this.admin.handleProcessMintIndex(job.data)
      this.logger.verbose(`Processed ${job.data.mint} / ${job.data.name} / ${job.data.cluster}`)
      cb(null, { success: true, data: job.data, result })
    } catch (e) {
      this.logger.error(`Error processing ${job.data.mint} / ${job.data.name} / ${job.data.cluster}`)
      this.logger.error(e)
      cb(e)
      return
    }
  }
}
