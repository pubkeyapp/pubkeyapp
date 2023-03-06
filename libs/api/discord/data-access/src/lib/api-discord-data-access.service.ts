import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { unknownUser, setupUrl } from '@pubkeyapp/api/discord/util'
import { CacheType, Client, CommandInteraction } from 'discord.js'

@Injectable()
export class ApiDiscordDataAccessService {
  client: Client<true> | undefined
  constructor(private readonly core: ApiCoreService) {}

  getRedirectUrl() {
    return this.core.config.apiUrl + '/discord/setup'
  }

  getSetupUrl() {
    return setupUrl(this.client.application.id, process.env.DISCORD_BOT_PERMISSIONS)
  }

  getDiscordIdentityUser(providerId: string) {
    return this.core.data.findUserByIdentity({ provider: IdentityProvider.Discord, providerId })
  }

  async getDiscordUser(interaction: CommandInteraction<CacheType>) {
    const found = await this.getDiscordIdentityUser(interaction.user?.id)
    if (!found) {
      await interaction.reply({
        content: unknownUser(interaction.user),
        ephemeral: false,
      })
      return
    }
    return found
  }
}
