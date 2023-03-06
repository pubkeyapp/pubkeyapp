import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiInviteAdminService } from './api-invite-admin.service'
import { ApiInviteService } from './api-invite.service'

@Module({
  providers: [ApiInviteService, ApiInviteAdminService],
  exports: [ApiInviteService, ApiInviteAdminService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiInviteDataAccessModule {}
