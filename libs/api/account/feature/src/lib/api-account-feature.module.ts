import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiAccountFeatureController } from './api-account-feature.controller'
import { ApiAdminAccountResolver } from './api-admin-account.resolver'
import { ApiUserAccountResolver } from './api-user-account.resolver'

@Module({
  controllers: [ApiAccountFeatureController],
  providers: [ApiAdminAccountResolver, ApiUserAccountResolver],
  imports: [ApiAccountDataAccessModule],
})
export class ApiAccountFeatureModule {}
