import { Module } from '@nestjs/common'
import { ApiSolanaDataAccessModule } from '@pubkeyapp/api/solana/data-access'
import { ApiSolanaController } from './api-solana.controller'

@Module({
  controllers: [ApiSolanaController],
  imports: [ApiSolanaDataAccessModule],
})
export class ApiSolanaFeatureModule {}
