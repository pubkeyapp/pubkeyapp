import { Module } from '@nestjs/common'
import { ApiConfigController } from './api-config.controller'
import { ApiConfigDataAccessModule } from '@pubkeyapp/api/config/data-access'
import { ApiConfigResolver } from './api-config.resolver'

@Module({
  controllers: [ApiConfigController],
  providers: [ApiConfigResolver],
  imports: [ApiConfigDataAccessModule],
})
export class ApiConfigFeatureModule {}
