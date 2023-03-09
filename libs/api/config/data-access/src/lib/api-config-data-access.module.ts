import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigSettingsService } from './api-config-settings.service'
import { ApiConfigService } from './api-config.service'
import configuration from './config/configuration'
import { validationSchema } from './config/validation-schema'

@Module({
  providers: [ApiConfigService, ApiConfigSettingsService],
  exports: [ApiConfigService],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      validationSchema,
    }),
  ],
})
export class ApiConfigDataAccessModule {}
