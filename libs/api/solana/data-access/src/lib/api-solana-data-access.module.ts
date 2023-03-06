import { Module } from '@nestjs/common'
import { ApiSolanaDataAccessService } from './api-solana-data-access.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiSolanaDataAccessService],
  exports: [ApiSolanaDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiSolanaDataAccessModule {}
