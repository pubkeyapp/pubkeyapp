import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ApiAuthService } from './api-auth.service'
import { JwtStrategy, SolanaStrategy } from './strategies'
import { DiscordStrategy } from './strategies/discord.strategy'

@Module({
  providers: [ApiAuthService, DiscordStrategy, JwtStrategy, SolanaStrategy],
  exports: [ApiAuthService],
  imports: [
    ApiCoreDataAccessModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
    }),
  ],
})
export class ApiAuthDataAccessModule {}
