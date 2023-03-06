import { Controller } from '@nestjs/common'
import { ApiSolanaDataAccessService } from '@pubkeyapp/api/solana/data-access'

@Controller('solana')
export class ApiSolanaFeatureController {
  constructor(private readonly service: ApiSolanaDataAccessService) {}
}
