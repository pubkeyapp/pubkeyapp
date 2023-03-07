import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiPublicPageService, Page } from '@pubkeyapp/api/page/data-access'

@ApiTags('page')
@Controller('page')
export class ApiPublicPageController {
  constructor(private readonly service: ApiPublicPageService) {}

  @Get('get-page-by-id/:pageId')
  @ApiParam({ name: 'pageId', type: 'string' })
  @ApiOperation({ operationId: 'getPageById' })
  @ApiResponse({ type: Page })
  getPageById(@Param('pageId') pageId: string) {
    return this.service.getPageById(pageId)
  }

  @Get('get-page-by-url')
  @ApiQuery({ name: 'url', type: 'string', required: true })
  @ApiOperation({ operationId: 'getPageByUrl' })
  @ApiResponse({ type: Page })
  getPageByUrl(@Query('url') url: string) {
    if (!url?.length) {
      throw new BadRequestException('Empty url')
    }
    return this.service.getPageByUrl(url)
  }
}
