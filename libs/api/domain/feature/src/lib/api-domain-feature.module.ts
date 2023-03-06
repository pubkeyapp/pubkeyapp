import { Module } from '@nestjs/common'
import { ApiDomainDataAccessModule } from '@pubkeyapp/api/domain/data-access'
import { ApiDomainAdminResolver } from './api-domain-admin.resolver'

@Module({
  imports: [ApiDomainDataAccessModule],
  providers: [ApiDomainAdminResolver],
})
export class ApiDomainFeatureModule {}
