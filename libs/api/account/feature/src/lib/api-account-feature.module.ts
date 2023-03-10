import { Module } from '@nestjs/common'
import { ApiAccountDataAccessModule } from '@pubkeyapp/api/account/data-access'
import { ApiAccountFieldResolver } from './api-account-field.resolver'
import { ApiAccountController } from './api-account.controller'
import { ApiAdminAccountResolver } from './api-admin-account.resolver'
import { ApiUserAccountResolver } from './api-user-account.resolver'

@Module({
  controllers: [ApiAccountController],
  providers: [ApiAdminAccountResolver, ApiAccountFieldResolver, ApiUserAccountResolver],
  imports: [ApiAccountDataAccessModule],
})
export class ApiAccountFeatureModule {}
