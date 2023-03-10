import { ApiAdminPlanService } from '@pubkeyapp/api/plan/data-access'
import { Controller } from '@nestjs/common'

@Controller('plan')
export class ApiPlanController {
  constructor(private readonly service: ApiAdminPlanService) {}
}
