import { ApiAuthDataAccessModule } from '@pubkeyapp/api/auth/data-access'
import { Module } from '@nestjs/common'
import { ApiAuthController } from './api-auth.controller'
import { ApiAuthResolver } from './api-auth.resolver'

@Module({
  controllers: [ApiAuthController],
  providers: [ApiAuthResolver],
  imports: [ApiAuthDataAccessModule],
})
export class ApiAuthFeatureModule {}
