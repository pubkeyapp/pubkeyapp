import { ApiAdminInviteService } from '@pubkeyapp/api/invite/data-access'
import { Controller } from '@nestjs/common'

@Controller('invite')
export class ApiInviteFeatureController {
  constructor(private readonly service: ApiAdminInviteService) {}
}
