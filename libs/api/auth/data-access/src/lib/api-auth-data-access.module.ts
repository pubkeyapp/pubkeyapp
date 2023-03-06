import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ApiAuthDataAccessService } from './api-auth-data-access.service'
import { JwtStrategy, SolanaStrategy } from './strategies'

@Module({
  providers: [ApiAuthDataAccessService, JwtStrategy, SolanaStrategy],
  exports: [ApiAuthDataAccessService],
  imports: [
    ApiCoreDataAccessModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
    }),
  ],
})
export class ApiAuthDataAccessModule {}
