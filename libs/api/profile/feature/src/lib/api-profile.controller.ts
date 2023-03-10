import { ApiAdminProfileService } from '@pubkeyapp/api/profile/data-access'
import { Controller } from '@nestjs/common'

@Controller('profile')
export class ApiProfileController {
  constructor(private readonly service: ApiAdminProfileService) {}
}
