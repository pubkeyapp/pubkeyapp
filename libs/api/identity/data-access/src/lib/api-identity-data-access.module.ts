import { Module } from '@nestjs/common'
import { ApiPublicIdentityService } from './api-public-identity.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiPublicIdentityService],
  exports: [ApiPublicIdentityService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiIdentityDataAccessModule {}
