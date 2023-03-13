import { Module } from '@nestjs/common'
import { ApiHeliusDataAccessModule } from '@pubkeyapp/api/helius/data-access'
import { ApiUserHeliusResolver } from './api-user-helius.resolver'

@Module({
  imports: [ApiHeliusDataAccessModule],
  providers: [ApiUserHeliusResolver],
})
export class ApiHeliusFeatureModule {}
