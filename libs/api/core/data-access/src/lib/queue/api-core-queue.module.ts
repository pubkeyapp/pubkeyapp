import { BullModule, BullRootModuleOptions } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ApiConfigDataAccessModule, ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { ApiCoreQueueService } from './api-core-queue.service'

@Module({
  providers: [ApiCoreQueueService],
  exports: [ApiCoreQueueService],
  imports: [
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
export class ApiCoreQueueModule {}
