import { Module } from '@nestjs/common'
import { IntentsBitField } from 'discord.js'
import { NecordModule } from 'necord'
import { ApiDiscordDataAccessService } from './api-discord-data-access.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

import { ACCOUNT_SERVICES } from './account'
import { CORE_SERVICES } from './core'
import { SOLANA_SERVICES } from './solana'
import { ApiSolanaDataAccessModule } from '@pubkeyapp/api/solana/data-access'

function getFromEnvironment(key: string, separator = '|'): string[] {
  return process.env[key]?.includes(separator) ? process.env[key]?.split(separator) : [process.env[key]]
}

@Module({
  providers: [ApiDiscordDataAccessService, ...ACCOUNT_SERVICES, ...CORE_SERVICES, ...SOLANA_SERVICES],
  exports: [ApiDiscordDataAccessService],
  imports: [
    ApiCoreDataAccessModule,
    ApiSolanaDataAccessModule,
    NecordModule.forRoot({
      development: getFromEnvironment('DISCORD_DEVELOPMENT_GUILD_ID'),
      token: process.env.DISCORD_BOT_TOKEN,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
      ],
    }),
  ],
})
export class ApiDiscordDataAccessModule {}
