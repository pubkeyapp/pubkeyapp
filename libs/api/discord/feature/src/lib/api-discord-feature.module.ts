import { Module } from '@nestjs/common'
import { ApiDiscordDataAccessModule } from '@pubkeyapp/api/discord/data-access'

import { ApiDiscordFeatureController } from './api-discord-feature.controller'

@Module({
  controllers: [ApiDiscordFeatureController],
  imports: [ApiDiscordDataAccessModule],
})
export class ApiDiscordFeatureModule {}
