import { Controller } from '@nestjs/common'
import { ApiIdentityDataAccessService } from '@pubkeyapp/api/identity/data-access'

@Controller('identity')
export class ApiIdentityFeatureController {
  constructor(private readonly service: ApiIdentityDataAccessService) {}
}
