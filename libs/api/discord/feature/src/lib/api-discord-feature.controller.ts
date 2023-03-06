import { Controller, Get, Res } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { ApiDiscordDataAccessService } from '@pubkeyapp/api/discord/data-access'
import { Response } from 'express'

@Controller('discord')
export class ApiDiscordFeatureController {
  constructor(private readonly service: ApiDiscordDataAccessService) {}

  @ApiExcludeEndpoint()
  @Get('setup')
  getSetupUrl(@Res() res: Response) {
    return res.redirect(this.service.getSetupUrl())
  }
}
