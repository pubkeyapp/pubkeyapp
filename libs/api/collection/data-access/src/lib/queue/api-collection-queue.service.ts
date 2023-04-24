import { InjectQueue } from '@nestjs/bull'
import { Injectable, Logger } from '@nestjs/common'
import { ClusterType } from '@prisma/client'
import { ApiCoreService, QueueType } from '@pubkeyapp/api/core/data-access'
import { Queue } from 'bull'
import { Mint } from '../entity/mint.entity'
import { CollectionMintTask } from './api-collection-queue.helper'

@Injectable()
export class ApiCollectionQueueService {
  private readonly logger = new Logger(ApiCollectionQueueService.name)
  private readonly queue = QueueType.CollectionMint
  constructor(
    @InjectQueue(QueueType.CollectionMint) readonly collectionMintQueue: Queue,
    readonly core: ApiCoreService,
  ) {
    this.core.queue.registerQueue(this.queue, collectionMintQueue)
  }

  async processCollectionMintsMeta({ mints }: { mints: Mint[] }) {
    const task = CollectionMintTask.ProcessMintMeta
    const jobs = await this.collectionMintQueue.addBulk([
      ...mints.map((mint) => ({
        name: task,
        data: { mint },
        opts: {
          jobId: `${task}-${mint.cluster}-${mint.address}`,
          attempts: 3,
          backoff: { type: 'exponential', delay: 1000 },
        },
      })),
    ])
    this.logger.verbose(`Added ${jobs.length} jobs to ${this.queue} queue ${task}`)
  }

  async processCollectionMintsNormalize({ mints }: { mints: Mint[] }) {
    const task = CollectionMintTask.ProcessMintNormalize
    const jobs = await this.collectionMintQueue.addBulk([
      ...mints.map((mint) => ({
        name: task,
        data: { mint },
        opts: {
          jobId: `${task}-${mint.cluster}-${mint.address}`,
          attempts: 3,
          backoff: { type: 'exponential', delay: 1000 },
        },
      })),
    ])
    this.logger.verbose(`Added ${jobs.length} jobs to queue ${this.queue} task ${task}`)
  }

  async processCollectionMintsIndex({
    cluster,
    collectionId,
    mintList,
  }: {
    cluster: ClusterType
    collectionId: string
    mintList: { name: string; mint: string }[]
  }) {
    const task = CollectionMintTask.ProcessMintIndex
    const jobs = await this.collectionMintQueue.addBulk([
      ...mintList.map(({ mint, name }) => ({
        name: task,
        data: { mint, name, cluster, collectionId },
        opts: {
          jobId: `${task}-${cluster}-${mint}`,
          attempts: 3,
          backoff: { type: 'exponential', delay: 1000 },
        },
      })),
    ])
    this.logger.verbose(`Added ${jobs.length} jobs to ${this.queue} queue ${task}`)
  }
}
