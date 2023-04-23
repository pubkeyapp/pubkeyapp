import { Module } from '@nestjs/common'
import { ApiCollectionDataAccessModule } from '@pubkeyapp/api/collection/data-access'
import { ApiAdminCollectionResolver } from './api-admin-collection.resolver'
import { ApiCollectionFieldResolver } from './api-collection-field.resolver'
import { ApiUserCollectionResolver } from './api-user-collection.resolver'

@Module({
  providers: [ApiAdminCollectionResolver, ApiCollectionFieldResolver, ApiUserCollectionResolver],
  imports: [ApiCollectionDataAccessModule],
})
export class ApiCollectionFeatureModule {}
