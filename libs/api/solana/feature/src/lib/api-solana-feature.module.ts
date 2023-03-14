import { Module } from '@nestjs/common'
import { ApiSolanaDataAccessModule } from '@pubkeyapp/api/solana/data-access'
import { ApiSolanaController } from './api-solana.controller'
import { ApiSolanaResolver } from './api-solana.resolver'

@Module({
  controllers: [ApiSolanaController],
  providers: [ApiSolanaResolver],
  imports: [ApiSolanaDataAccessModule],
})
export class ApiSolanaFeatureModule {}
