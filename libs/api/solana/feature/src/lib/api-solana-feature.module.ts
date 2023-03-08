import { Module } from '@nestjs/common'
import { ApiSolanaDataAccessModule } from '@pubkeyapp/api/solana/data-access'
import { ApiSolanaFeatureController } from './api-solana-feature.controller'

@Module({
  controllers: [ApiSolanaFeatureController],
  imports: [ApiSolanaDataAccessModule],
})
export class ApiSolanaFeatureModule {}
