import { Module } from '@nestjs/common'
import { ApiSolanaFeatureController } from './api-solana-feature.controller'
import { ApiSolanaDataAccessModule } from '@pubkeyapp/api/solana/data-access'

@Module({
  controllers: [ApiSolanaFeatureController],
  providers: [],
  exports: [],
  imports: [ApiSolanaDataAccessModule],
})
export class ApiSolanaFeatureModule {}
