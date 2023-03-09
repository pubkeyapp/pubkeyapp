import { Injectable, Logger } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { CoreUser } from '@pubkeyapp/api/core/data-access'
import { ApiCoreDataService } from '../data/api-core-data.service'

@Injectable()
export class ApiCoreSettingsService {
  private readonly logger = new Logger(ApiCoreSettingsService.name)

  constructor(private readonly config: ApiConfigService, private readonly data: ApiCoreDataService) {}
}
