import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigDataAccessService } from './api-config-data-access.service'
import configuration from './config/configuration'
import { validationSchema } from './config/validation-schema'

@Module({
  providers: [ApiConfigDataAccessService],
  exports: [ApiConfigDataAccessService],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      validationSchema,
    }),
  ],
})
export class ApiConfigDataAccessModule {}
