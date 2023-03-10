import { Controller } from '@nestjs/common'
import { ApiUserIdentityService } from '@pubkeyapp/api/identity/data-access'

@Controller('identity')
export class ApiIdentityController {
  constructor(private readonly service: ApiUserIdentityService) {}
}
