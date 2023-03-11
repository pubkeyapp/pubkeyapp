import { Controller, Get, Logger, Param, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ApiAnonJwtGuard,
  ApiAuthDiscordGuard,
  ApiAuthGithubGuard,
  ApiAuthGoogleGuard,
  ApiAuthJwtGuard,
  ApiAuthService,
  ApiAuthSolanaGuard,
  ApiAuthTwitterGuard,
  AuthRequest,
  RequestChallenge,
  ResponseChallengeOptions,
} from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { Response } from 'express'

@ApiTags('auth')
@Controller('auth')
export class ApiAuthController {
  private readonly logger = new Logger(ApiAuthController.name)
  constructor(private readonly service: ApiAuthService) {
    this.logger.debug(`constructor: ${ApiAuthService.name}`)
  }

  @Get('discord')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthDiscordGuard)
  discord() {
    return
  }

  @Get('discord/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthDiscordGuard)
  async discordAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    res.redirect(this.service.core.config.webUrl + '/dashboard/identities')
  }

  @Get('github')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthGithubGuard)
  github() {
    return
  }

  @Get('github/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthGithubGuard)
  async githubAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    res.redirect(this.service.core.config.webUrl + '/dashboard/identities')
  }

  @Get('google')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthGoogleGuard)
  google() {
    return
  }

  @Get('google/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthGoogleGuard)
  async googleAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    res.redirect(this.service.core.config.webUrl + '/dashboard/identities')
  }

  @Get('twitter')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthTwitterGuard)
  twitter() {
    return
  }

  @Get('twitter/callback')
  @ApiExcludeEndpoint()
  @UseGuards(ApiAuthJwtGuard, ApiAuthTwitterGuard)
  async twitterAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    res.redirect(this.service.core.config.webUrl + '/dashboard/identities')
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
    return this.service.getUserById(req.user?.id)
  }

  @Get('logout')
  @ApiOperation({ operationId: 'logout' })
  @ApiResponse({ type: Boolean })
  logout(@Req() req: AuthRequest, @Res() res: Response) {
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
