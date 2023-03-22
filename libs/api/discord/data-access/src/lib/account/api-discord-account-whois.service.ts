import { Injectable } from '@nestjs/common'
import { formatUserEmbed, unknownUser } from '@pubkeyapp/api/discord/util'
import { User } from 'discord.js'
import { Ctx, Options, SlashCommand, SlashCommandContext, UserOption } from 'necord'
import { ApiDiscordService } from '../api-discord.service'

export class Whois {
  @UserOption({
    name: 'user',
    description: 'User to check',
    required: true,
  })
  user: User
}

@Injectable()
export class ApiDiscordAccountWhoisService {
  constructor(private readonly core: ApiDiscordService) {}

  @SlashCommand({ name: 'whois', description: 'whois command.' })
  async whois(@Ctx() [interaction]: SlashCommandContext, @Options() { user }: Whois) {
    if (this.core.client.user.id === user.id) {
      return interaction.reply({ content: `${user}, I guess that's me. I'm a bot.` })
    }

    const found = await this.core.getDiscordIdentityUser(user.id)

    if (found) {
      return interaction.reply({ embeds: [formatUserEmbed(found)] })
    }

    return interaction.reply({ content: unknownUser(interaction.user, user) })
  }
}
