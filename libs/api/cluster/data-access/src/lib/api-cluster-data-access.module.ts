import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminClusterService } from './api-admin-cluster.service'
import { ApiUserClusterService } from './api-user-cluster.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAdminClusterService, ApiUserClusterService],
  exports: [ApiAdminClusterService, ApiUserClusterService],
})
export class ApiClusterDataAccessModule {}
