import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'

@Resolver()
export class ApiSolanaFeatureResolver {
  constructor(private readonly service: ApiSolanaService) {}
}
