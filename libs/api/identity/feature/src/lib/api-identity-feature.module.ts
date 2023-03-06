import { Module } from '@nestjs/common'
import { ApiIdentityFeatureController } from './api-identity-feature.controller'
import { ApiIdentityDataAccessModule } from '@pubkeyapp/api/identity/data-access'

@Module({
  controllers: [ApiIdentityFeatureController],
  providers: [],
  exports: [],
  imports: [ApiIdentityDataAccessModule],
})
export class ApiIdentityFeatureModule {}
