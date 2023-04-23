import { Module } from '@nestjs/common'
import { ApiClusterDataAccessModule } from '@pubkeyapp/api/cluster/data-access'
import { ApiAdminClusterResolver } from './api-admin-cluster.resolver'
import { ApiClusterFieldResolver } from './api-cluster-field.resolver'
import { ApiUserClusterResolver } from './api-user-cluster.resolver'

@Module({
  providers: [ApiAdminClusterResolver, ApiClusterFieldResolver, ApiUserClusterResolver],
  imports: [ApiClusterDataAccessModule],
})
export class ApiClusterFeatureModule {}
