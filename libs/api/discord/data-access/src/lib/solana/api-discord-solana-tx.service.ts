import { Injectable } from '@nestjs/common'
import { ApiSolanaService } from '@pubkeyapp/api/solana/data-access'
import { ClusterType } from '@pubkeyapp/solana'
import { Ctx, Options, SlashCommand, SlashCommandContext, StringOption } from 'necord'

import { ApiDiscordService } from '../api-discord.service'

export class SolanaTx {
  @StringOption({
    name: 'signature',
    description: 'Signature of the tx to look up',
    required: true,
    min_length: 85,
    max_length: 92,
  })
  signature: string
  @StringOption({
    name: 'cluster',
    description: 'Cluster to look up the tx on',
    required: false,
    choices: [
      { name: 'mainnet', value: ClusterType.Mainnet },
      { name: 'devnet', value: ClusterType.Devnet },
    ],
  })
  cluster: ClusterType
}

@Injectable()
export class ApiDiscordSolanaTxService {
  constructor(private readonly core: ApiDiscordService, private readonly solana: ApiSolanaService) {}

  @SlashCommand({ name: 'tx', description: 'Look up an transaction on Solana.' })
  async tx(@Ctx() [interaction]: SlashCommandContext, @Options() { signature, cluster }: SolanaTx) {
    cluster = cluster || ClusterType.Mainnet

    const solana = this.solana.getSolana(cluster)
    const found = await solana.connection.getParsedTransaction(signature, 'confirmed')

    const explorerUrl = solana.getExplorerUrl(`tx/${signature}`)

    if (found && found.slot) {
      return interaction.reply({
        content: `${interaction.user} I found ${signature} on ${cluster}.
[View on PubKey](${explorerUrl})`,
        ephemeral: false,
      })
    }
    return interaction.reply({
      content: `${interaction.user} I can't find ${signature} on ${cluster}...
[View on PubKey](${explorerUrl})`,
      ephemeral: false,
    })
  }
}
