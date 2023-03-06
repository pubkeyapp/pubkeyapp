import { Module } from '@nestjs/common'
import { ApiConfigFeatureController } from './api-config-feature.controller'
import { ApiConfigDataAccessModule } from '@pubkeyapp/api/config/data-access'
import { ApiConfigFeatureResolver } from './api-config-feature.resolver'

@Module({
  controllers: [ApiConfigFeatureController],
  providers: [ApiConfigFeatureResolver],
  imports: [ApiConfigDataAccessModule],
})
export class ApiConfigFeatureModule {}
