import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminInviteService } from './api-admin-invite.service'
import { ApiPublicInviteService } from './api-public-invite.service'
import { ApiUserInviteService } from './api-user-invite.service'

const providers = [ApiAdminInviteService, ApiPublicInviteService, ApiUserInviteService]

@Module({
  providers,
  exports: providers,
  imports: [ApiCoreDataAccessModule],
})
export class ApiInviteDataAccessModule {}
