import { Module } from '@nestjs/common'
import { ApiUserDataAccessModule } from '@pubkeyapp/api/user/data-access'

import { ApiUserAdminResolver } from './api-user-admin.resolver'
import { ApiUserPublicController } from './api-user-public.controller'
import { ApiUserPublicResolver } from './api-user-public.resolver'
import { ApiUserUserResolver } from './api-user-user.resolver'

@Module({
  controllers: [ApiUserPublicController],
  imports: [ApiUserDataAccessModule],
  providers: [ApiUserPublicResolver, ApiUserUserResolver, ApiUserAdminResolver],
})
export class ApiUserFeatureModule {}
