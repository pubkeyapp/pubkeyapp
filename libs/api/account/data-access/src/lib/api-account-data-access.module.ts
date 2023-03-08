import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiSolanaDataAccessModule } from '@pubkeyapp/api/solana/data-access'
import { ApiAccountAdminService } from './api-account-admin.service'
import { ApiAnonAccountService } from './api-anon-account.service'

@Module({
  controllers: [],
  providers: [ApiAnonAccountService, ApiAccountAdminService],
  exports: [ApiAnonAccountService, ApiAccountAdminService],
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
})
export class ApiAccountDataAccessModule {}
