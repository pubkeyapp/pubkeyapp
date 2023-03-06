import { Injectable } from '@nestjs/common'
import { Ctx, SlashCommand, SlashCommandContext } from 'necord'

@Injectable()
export class ApiDiscordCorePingService {
  @SlashCommand({ name: 'ping', description: 'Ping command!' })
  async onPing(@Ctx() [interaction]: SlashCommandContext) {
    return interaction.reply({
      content: `${interaction.user} pong!`,
      ephemeral: true,
    })
  }
}
