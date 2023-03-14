import { Args, Int, Mutation, Resolver } from '@nestjs/graphql'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'

@Resolver()
export class ApiSolanaResolver {
  constructor(private readonly service: ApiSolanaService) {}

  @Mutation(() => Boolean, { nullable: true })
  anonSolanaRequestAirdrop(
    @Args('address') address: string,
    @Args({ name: 'lamports', type: () => Int }) lamports: number,
  ) {
    return this.service.requestAirdrop(address, lamports)
  }
}
