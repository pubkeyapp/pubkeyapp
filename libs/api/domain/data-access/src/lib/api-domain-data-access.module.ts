import { Module } from '@nestjs/common'
import { ApiAdminDomainService } from './api-admin-domain.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiAdminDomainService],
  exports: [ApiAdminDomainService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiDomainDataAccessModule {}
