import { Module } from '@nestjs/common'
import { ApiUserDataAccessModule } from '@pubkeyapp/api/user/data-access'

import { ApiAdminUserResolver } from './api-admin-user.resolver'
import { ApiPublicUserController } from './api-public-user.controller'
import { ApiPublicUserResolver } from './api-public-user.resolver'
import { ApiUserUserResolver } from './api-user-user.resolver'

@Module({
  controllers: [ApiPublicUserController],
  imports: [ApiUserDataAccessModule],
  providers: [ApiPublicUserResolver, ApiUserUserResolver, ApiAdminUserResolver],
})
export class ApiUserFeatureModule {}
