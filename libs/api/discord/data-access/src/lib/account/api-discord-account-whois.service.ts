import { Injectable } from '@nestjs/common'
import { ApiDiscordDataAccessService } from '@pubkeyapp/api/discord/data-access'
import { formatUserEmbed, unknownUser } from '@pubkeyapp/api/discord/util'
import { User } from 'discord.js'
import { Ctx, Options, SlashCommand, SlashCommandContext, UserOption } from 'necord'

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
  constructor(private readonly core: ApiDiscordDataAccessService) {}

  @SlashCommand({ name: 'whois', description: 'whois command.' })
  async whois(@Ctx() [interaction]: SlashCommandContext, @Options() { user }: Whois) {
    const found = await this.core.getDiscordIdentityUser(user.id)

    if (found) {
      return interaction.reply({
        embeds: [formatUserEmbed(found)],
        ephemeral: true,
      })
    }
    return interaction.reply({
      content: unknownUser(user),
      ephemeral: false,
    })
  }
}
