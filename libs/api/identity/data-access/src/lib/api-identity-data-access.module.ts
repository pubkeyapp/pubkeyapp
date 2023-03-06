import { Module } from '@nestjs/common'
import { ApiIdentityDataAccessService } from './api-identity-data-access.service'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiIdentityDataAccessService],
  exports: [ApiIdentityDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiIdentityDataAccessModule {}
