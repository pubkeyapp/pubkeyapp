import { Module } from '@nestjs/common'
import { ApiSolanaService } from './api-solana.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiSolanaService],
  exports: [ApiSolanaService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiSolanaDataAccessModule {}
