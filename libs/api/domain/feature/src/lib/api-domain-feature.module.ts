import { Module } from '@nestjs/common'
import { ApiDomainDataAccessModule } from '@pubkeyapp/api/domain/data-access'
import { ApiAdminDomainResolver } from './api-admin-domain.resolver'
import { ApiDomainFieldResolver } from './api-domain-field.resolver'

@Module({
  imports: [ApiDomainDataAccessModule],
  providers: [ApiAdminDomainResolver, ApiDomainFieldResolver],
})
export class ApiDomainFeatureModule {}
