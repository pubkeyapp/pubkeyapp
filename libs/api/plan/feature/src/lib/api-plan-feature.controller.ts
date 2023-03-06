import { ApiPlanAdminService } from '@pubkeyapp/api/plan/data-access'
import { Controller } from '@nestjs/common'

@Controller('plan')
export class ApiPlanFeatureController {
  constructor(private readonly service: ApiPlanAdminService) {}
}
