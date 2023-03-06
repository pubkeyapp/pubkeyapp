import { Injectable, Logger } from '@nestjs/common'
import { ApiDiscordDataAccessService } from '@pubkeyapp/api/discord/data-access'
import { ActivityType } from 'discord.js'
import { Context, ContextOf, Ctx, Once, UserCommand, UserCommandContext } from 'necord'

@Injectable()
export class ApiDiscordCoreSetupService {
  private readonly logger = new Logger(ApiDiscordCoreSetupService.name)

  constructor(private readonly service: ApiDiscordDataAccessService) {}

  @Once('ready')
  onReady(@Context() [client]: ContextOf<'ready'>) {
    this.service.client = client

    client.user.setActivity({
      name: 'Solana',
      type: ActivityType.Watching,
      url: 'https://pubkey.app',
    })

    this.logger.verbose(`Logged in as ${client.user.username}`)
    this.logger.verbose(`Set up ${client.user.username}: ${this.service.getRedirectUrl()}`)
    client.guilds.fetch().then((res) => {
      res.map((guild) => {
        this.logger.verbose(` => Connected to ${guild.name}`)
      })
    })
  }

  @UserCommand({ name: 'Set up PubKey' })
  async onSetup(@Ctx() [interaction]: UserCommandContext) {
    return interaction.reply({
      ephemeral: true,
      content: `[Click this link to add ${
        interaction.client.user.username
      } to your server.](${this.service.getRedirectUrl()})`,
    })
  }
}
