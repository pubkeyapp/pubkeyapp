import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessModule } from '@pubkeyapp/api/identity/data-access'
import { ApiIdentityController } from './api-identity.controller'
import { ApiIdentityFieldResolver } from './api-identity-field.resolver'
import { ApiUserIdentityResolver } from './api-user-identity.resolver'

@Module({
  controllers: [ApiIdentityController],
  providers: [ApiIdentityFieldResolver, ApiUserIdentityResolver],
  exports: [],
  imports: [ApiIdentityDataAccessModule],
})
export class ApiIdentityFeatureModule {}
