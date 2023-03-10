import { Module } from '@nestjs/common'
import { ApiInviteDataAccessModule } from '@pubkeyapp/api/invite/data-access'
import { ApiAdminInviteResolver } from './api-admin-invite.resolver'
import { ApiAnonInviteResolver } from './api-anon-invite.resolver'
import { ApiInviteController } from './api-invite.controller'
import { ApiInviteFieldResolver } from './api-invite-field.resolver'
import { ApiUserInviteResolver } from './api-user-invite.resolver'

@Module({
  controllers: [ApiInviteController],
  imports: [ApiInviteDataAccessModule],
  providers: [ApiAdminInviteResolver, ApiAnonInviteResolver, ApiInviteFieldResolver, ApiUserInviteResolver],
})
export class ApiInviteFeatureModule {}
