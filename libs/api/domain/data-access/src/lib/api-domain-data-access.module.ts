import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminDomainService } from './api-admin-domain.service'
import { ApiUserDomainService } from './api-user-domain.service'

@Module({
  providers: [ApiAdminDomainService, ApiUserDomainService],
  exports: [ApiAdminDomainService, ApiUserDomainService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiDomainDataAccessModule {}
