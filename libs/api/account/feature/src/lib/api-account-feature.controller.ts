import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { Account, ApiAnonAccountService, NetworkType } from '@pubkeyapp/api/account/data-access'
import { ApiAnonJwtGuard, AuthRequest } from '@pubkeyapp/api/auth/data-access'

@Controller('account')
export class ApiAccountFeatureController {
  constructor(private readonly service: ApiAnonAccountService) {}

  @Get('get-account/:network/:address')
  @UseGuards(ApiAnonJwtGuard)
  @ApiOperation({ operationId: 'getAccount' })
  @ApiParam({ name: 'network', enumName: 'NetworkType', enum: NetworkType })
  @ApiParam({ name: 'address', type: 'string' })
  @ApiResponse({ type: Account })
  getAccount(@Req() req: AuthRequest, @Param('network') network: NetworkType, @Param('address') address: string) {
    return this.service.getAccount(req.user?.id, network, address)
  }
}
