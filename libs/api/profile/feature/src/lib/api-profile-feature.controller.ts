import { ApiAdminProfileService } from '@pubkeyapp/api/profile/data-access'
import { Controller } from '@nestjs/common'

@Controller('profile')
export class ApiProfileFeatureController {
  constructor(private readonly service: ApiAdminProfileService) {}
}
