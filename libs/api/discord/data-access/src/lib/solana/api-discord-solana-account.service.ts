import { Injectable } from '@nestjs/common'
import { ApiDiscordDataAccessService } from '@pubkeyapp/api/discord/data-access'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'
import { ClusterType } from '@pubkeyapp/solana'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { Ctx, Options, SlashCommand, SlashCommandContext, StringOption } from 'necord'

export class SolanaAccount {
  @StringOption({
    name: 'address',
    description: 'Address of the account to look up',
    required: true,
    min_length: 44,
    max_length: 46,
  })
  address: string
  @StringOption({
    name: 'cluster',
    description: 'Cluster to look up the account on',
    required: false,
    choices: [
      { name: 'mainnet', value: ClusterType.Mainnet },
      { name: 'devnet', value: ClusterType.Devnet },
    ],
  })
  cluster: ClusterType
}

@Injectable()
export class ApiDiscordSolanaAccountService {
  constructor(private readonly core: ApiDiscordDataAccessService, private readonly solana: ApiSolanaService) {}

  @SlashCommand({ name: 'account', description: 'Look up an account on Solana.' })
  async account(@Ctx() [interaction]: SlashCommandContext, @Options() { address, cluster }: SolanaAccount) {
    cluster = cluster || ClusterType.Mainnet

    const solana = this.solana.getSolana(cluster)
    const found = await solana.getAccountInfo(address)

    const explorerUrl = solana.getExplorerUrl(`account/${address}`)

    if (found && found.raw) {
      const balance = await solana.connection.getBalance(new PublicKey(address))

      return interaction.reply({
        content: `${interaction.user} I found ${address} on ${cluster}.
Balance ${balance / LAMPORTS_PER_SOL} SOL
[View on PubKey](${explorerUrl})`,
        ephemeral: false,
      })
    }
    return interaction.reply({
      content: `${interaction.user} I can't find ${address} on ${cluster}...
[View on PubKey](${explorerUrl})`,
      ephemeral: false,
    })
  }
}
