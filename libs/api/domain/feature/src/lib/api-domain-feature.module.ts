import { Module } from '@nestjs/common'
import { ApiDomainDataAccessModule } from '@pubkeyapp/api/domain/data-access'
import { ApiAdminDomainResolver } from './api-admin-domain.resolver'
import { ApiDomainFieldResolver } from './api-domain-field.resolver'
import { ApiUserDomainResolver } from './api-user-domain.resolver'

@Module({
  imports: [ApiDomainDataAccessModule],
  providers: [ApiAdminDomainResolver, ApiDomainFieldResolver, ApiUserDomainResolver],
})
export class ApiDomainFeatureModule {}
