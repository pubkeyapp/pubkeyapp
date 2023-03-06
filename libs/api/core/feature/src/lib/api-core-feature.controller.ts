import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Controller, Get } from '@nestjs/common'

@Controller('core')
export class ApiCoreFeatureController {
  constructor(private readonly service: ApiCoreService) {}

  @Get('uptime')
  @ApiExcludeEndpoint()
  uptime() {
    return this.service.uptime()
  }
}
