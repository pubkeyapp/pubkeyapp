import { Module } from '@nestjs/common'
import { ApiDomainAdminService } from './api-domain-admin.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiDomainAdminService],
  exports: [ApiDomainAdminService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiDomainDataAccessModule {}
