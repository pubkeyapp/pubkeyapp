import { Controller, Get, Logger, Param, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import {
  ApiAnonJwtGuard,
  ApiAuthDataAccessService,
  ApiAuthSolanaGuard,
  ResponseChallengeOptions,
  RequestChallenge,
  AuthRequest,
} from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { boolean } from 'joi'

@ApiTags('auth')
@Controller('auth')
export class ApiAuthFeatureController {
  private readonly logger = new Logger(ApiAuthFeatureController.name)
  constructor(private readonly service: ApiAuthDataAccessService) {
    this.logger.debug(`constructor: ${ApiAuthDataAccessService.name}`)
  }

  @UseGuards(ApiAnonJwtGuard)
  @Get('me')
  @ApiOperation({ operationId: 'me' })
  @ApiResponse({ type: User })
  me(@Req() req: AuthRequest) {
    if (!req.user) {
      this.logger.debug(`me: no user`)
      return null
    }
    this.logger.debug(`me`, { headers: req.headers, username: req.user?.username, id: req.user?.id })
    return this.service.getUserById(req.user?.id)
  }

  @Get('logout')
  @ApiOperation({ operationId: 'logout' })
  @ApiResponse({ type: Boolean })
  logout(@Req() req: AuthRequest, @Res() res: Response) {
    this.logger.debug(`logout`, { headers: req.headers, username: req.user?.username })
    return this.service.logout(req, res)
  }

  @Get('request-challenge/:publicKey')
  @ApiOperation({ operationId: 'requestChallenge' })
  @ApiParam({ name: 'publicKey', type: 'string' })
  @ApiResponse({ type: RequestChallenge })
  requestChallenge(@Param('publicKey') publicKey: string) {
    this.logger.debug(`requestChallenge: ${publicKey}`)
    return this.service.requestChallenge(publicKey)
  }

  @UseGuards(ApiAuthSolanaGuard)
  @Post('respond-challenge')
  @ApiBody({ type: ResponseChallengeOptions })
  @ApiOperation({ operationId: 'respondChallenge' })
  @ApiResponse({ type: User })
  async respondChallenge(@Req() req: AuthRequest, @Res() res: Response) {
    this.logger.debug(`respondChallenge: ${req.body.challenge} ${req.body.publicKey} ${req.body.signature}`)
    const user = await this.service.login(req, res)

    return res.send(user)
  }
}
