import { Module } from '@nestjs/common'
import { ApiDiscordDataAccessModule } from '@pubkeyapp/api/discord/data-access'

import { ApiDiscordController } from './api-discord.controller'

@Module({
  controllers: [ApiDiscordController],
  imports: [ApiDiscordDataAccessModule],
})
export class ApiDiscordFeatureModule {}
