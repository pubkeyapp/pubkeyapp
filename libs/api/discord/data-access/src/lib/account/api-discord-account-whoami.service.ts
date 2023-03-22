import { Injectable } from '@nestjs/common'
import { formatUserEmbed } from '@pubkeyapp/api/discord/util'
import { Ctx, SlashCommand, SlashCommandContext } from 'necord'
import { ApiDiscordService } from '../api-discord.service'

@Injectable()
export class ApiDiscordAccountWhoamiService {
  constructor(private readonly core: ApiDiscordService) {}

  @SlashCommand({
    name: 'whoami',
    description: 'Verify if PubKey recognizes you',
  })
  async whoami(@Ctx() [interaction]: SlashCommandContext) {
    const found = await this.core.getDiscordUser(interaction)
    if (!found) return

    return interaction.reply({
      embeds: [formatUserEmbed(found)],
      ephemeral: true,
    })
  }
}
