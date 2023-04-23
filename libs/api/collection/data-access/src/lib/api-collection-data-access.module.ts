import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiAdminCollectionService } from './api-admin-collection.service'
import { ApiUserCollectionService } from './api-user-collection.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiAdminCollectionService, ApiUserCollectionService],
  exports: [ApiAdminCollectionService, ApiUserCollectionService],
})
export class ApiCollectionDataAccessModule {}
