import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiUserHeliusService } from './api-user-helius.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUserHeliusService],
  exports: [ApiUserHeliusService],
})
export class ApiHeliusDataAccessModule {}
