import { Controller, Get, Param } from '@nestjs/common'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'

@Controller('solana')
export class ApiSolanaFeatureController {
  constructor(private readonly service: ApiSolanaService) {}

  @Get('bonfida/lookup/:publicKey')
  bonfidaLookup(@Param('publicKey') publicKey: string) {
    return this.service.bonfidaLookup(publicKey)
  }
}
