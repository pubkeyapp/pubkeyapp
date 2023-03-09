import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessModule } from '@pubkeyapp/api/identity/data-access'
import { ApiIdentityFeatureController } from './api-identity-feature.controller'
import { ApiPublicIdentityResolver } from './api-public-identity.resolver'
import { ApiUserIdentityResolver } from './api-user-identity.resolver'

@Module({
  controllers: [ApiIdentityFeatureController],
  providers: [ApiPublicIdentityResolver, ApiUserIdentityResolver],
  exports: [],
  imports: [ApiIdentityDataAccessModule],
})
export class ApiIdentityFeatureModule {}
