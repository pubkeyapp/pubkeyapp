import { Module } from '@nestjs/common'
import { ApiUserDataAccessModule } from '@pubkeyapp/api/user/data-access'

import { ApiAdminUserResolver } from './api-admin-user.resolver'
import { ApiAnonUserController } from './api-anon-user.controller'
import { ApiAnonUserResolver } from './api-anon-user.resolver'
import { ApiUserFieldResolver } from './api-user-field.resolver'
import { ApiUserUserResolver } from './api-user-user.resolver'

@Module({
  controllers: [ApiAnonUserController],
  imports: [ApiUserDataAccessModule],
  providers: [ApiAnonUserResolver, ApiUserUserResolver, ApiUserFieldResolver, ApiAdminUserResolver],
})
export class ApiUserFeatureModule {}
