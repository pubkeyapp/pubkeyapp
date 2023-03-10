import { Controller } from '@nestjs/common'
import { ApiPublicIdentityService } from '@pubkeyapp/api/identity/data-access'

@Controller('identity')
export class ApiIdentityController {
  constructor(private readonly service: ApiPublicIdentityService) {}
}
