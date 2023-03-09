import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule, QueueType } from '@pubkeyapp/api/core/data-access'
import { ApiSolanaDataAccessModule } from '@pubkeyapp/api/solana/data-access'
import { ApiAccountAdminService } from './api-account-admin.service'
import { ApiAnonAccountService } from './api-anon-account.service'
import { AccountCloseQueueProcessor } from './queue/account-close/account-close-queue.processor'
import { AccountDiscoverQueueProcessor } from './queue/account-discover/account-discover-queue.processor'
import { ApiAccountQueueService } from './queue/api-account-queue.service'

const processors = [AccountDiscoverQueueProcessor, AccountCloseQueueProcessor]
const services = [ApiAnonAccountService, ApiAccountAdminService, ApiAccountQueueService]

@Module({
  controllers: [],
  imports: [
    ApiCoreDataAccessModule,
    ApiSolanaDataAccessModule,
    BullModule.registerQueue({ name: QueueType.AccountClose }),
    BullModule.registerQueue({ name: QueueType.AccountDiscover }),
  ],
  providers: [...services, ...processors],
  exports: [...services],
})
export class ApiAccountDataAccessModule {}
