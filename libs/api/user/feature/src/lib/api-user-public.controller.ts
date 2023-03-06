import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IdentityProvider } from '@pubkeyapp/api/identity/data-access'
import { ApiUserPublicService, User } from '@pubkeyapp/api/user/data-access'

@ApiTags('user')
@Controller('user')
export class ApiUserPublicController {
  constructor(private readonly service: ApiUserPublicService) {}

  @Get('get-user-by-id/:userId')
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiOperation({ operationId: 'getUserById' })
  @ApiResponse({ type: User })
  getUserById(@Param('userId') userId: string) {
    return this.service.getUserById(userId)
  }
  @Get('get-user-by-identity/:provider/:providerId')
  @ApiParam({ name: 'provider', enum: IdentityProvider, enumName: 'IdentityProvider' })
  @ApiParam({ name: 'providerId', type: 'string' })
  @ApiOperation({ operationId: 'getUserByIdentity' })
  @ApiResponse({ type: User })
  getUserByIdentity(@Param('provider') provider: IdentityProvider, @Param('providerId') providerId: string) {
    return this.service.getUserByIdentity(provider, providerId)
  }

  @Get('get-user-by-username/:username')
  @ApiParam({ name: 'username', type: 'string' })
  @ApiOperation({ operationId: 'getUserByUsername' })
  @ApiResponse({ type: User })
  getUserByUsername(@Param('username') username: string) {
    return this.service.getUserByUsername(username)
  }

  @Get('meta/:username')
  @ApiParam({ name: 'username', type: 'string' })
  @ApiOperation({ operationId: 'meta' })
  @ApiResponse({ type: User })
  meta(@Param('username') username: string) {
    return this.service.getUserByUsername(username)
  }
}
