import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiAnonJwtGuard } from '@pubkeyapp/api/auth/data-access'
import { ApiConfigDataAccessService, Config } from '@pubkeyapp/api/config/data-access'

@ApiTags('config')
@Controller('config')
export class ApiConfigFeatureController {
  constructor(private readonly service: ApiConfigDataAccessService) {}

  @Get()
  @UseGuards(ApiAnonJwtGuard)
  @ApiOperation({ operationId: 'getConfig' })
  @ApiResponse({ type: Config })
  config(@Request() req) {
    return this.service.getConfig(req.user)
  }
}
