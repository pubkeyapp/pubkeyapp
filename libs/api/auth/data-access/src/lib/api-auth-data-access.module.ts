import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAuthService } from './api-auth.service'
import { JwtStrategy, SolanaStrategy } from './strategies'
import { DiscordStrategy } from './strategies/discord.strategy'
import { GithubStrategy } from './strategies/github.strategy'
import { GoogleStrategy } from './strategies/google.strategy'

@Module({
  providers: [ApiAuthService, DiscordStrategy, GithubStrategy, GoogleStrategy, JwtStrategy, SolanaStrategy],
  exports: [ApiAuthService],
  imports: [
    ApiCoreDataAccessModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
    }),
  ],
})
export class ApiAuthDataAccessModule {}
