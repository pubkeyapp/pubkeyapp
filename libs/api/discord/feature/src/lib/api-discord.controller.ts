import { Controller, Get, Res } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'
import { ApiDiscordService } from '@pubkeyapp/api/discord/data-access'
import { Response } from 'express'

@Controller('discord')
export class ApiDiscordController {
  constructor(private readonly service: ApiDiscordService) {}

  @ApiExcludeEndpoint()
  @Get('setup')
  getSetupUrl(@Res() res: Response) {
    return res.redirect(this.service.getSetupUrl())
  }
}
