import { BullModule, BullRootModuleOptions } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ApiConfigDataAccessModule, ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiQueueDataAccessService } from './api-queue-data-access.service'
import { ApiQueueCloseAccountModule } from './queue/close-account/api-queue-close-account.module'
import { ApiQueueParseBlockModule } from './queue/parse-block/api-queue-parse-block.module'

@Module({
  controllers: [],
  providers: [ApiQueueDataAccessService],
  exports: [ApiQueueDataAccessService],
  imports: [
    ApiCoreDataAccessModule,
    ApiQueueCloseAccountModule,
    ApiQueueParseBlockModule,
    BullModule.forRootAsync({
      imports: [ApiConfigDataAccessModule],
      useFactory: async (config: ApiConfigService) =>
        ({
          prefix: 'pubkey:api',
          redis: config.redisOptions,
        } as BullRootModuleOptions),
      inject: [ApiConfigService],
    }),
  ],
})
export class ApiQueueDataAccessModule {}
