import { ApiAuthDataAccessModule } from '@pubkeyapp/api/auth/data-access'
import { Module } from '@nestjs/common'
import { ApiAuthFeatureController } from './api-auth-feature.controller'
import { ApiAuthFeatureResolver } from './api-auth-feature.resolver'

@Module({
  controllers: [ApiAuthFeatureController],
  providers: [ApiAuthFeatureResolver],
  imports: [ApiAuthDataAccessModule],
})
export class ApiAuthFeatureModule {}
