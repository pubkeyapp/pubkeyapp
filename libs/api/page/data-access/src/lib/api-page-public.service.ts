import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { convertCoreDbPage, parseUrl } from './api-page.helpers'

@Injectable()
export class ApiPagePublicService {
  private readonly logger = new Logger(ApiPagePublicService.name)
  constructor(private readonly core: ApiCoreService) {}

  getPageById(pageId: string) {
    return this.core.data.page
      .findUnique({
        where: { id: pageId },
        include: {
          blocks: {
            orderBy: { order: 'asc' },
          },
          domains: { include: { domain: true } },
        },
      })
      .then(async (page) => {
        if (!page) {
          this.logger.warn(`getPageById: Page not found: ${pageId}`)
          throw new NotFoundException(`Page not found.`)
        }
        const owner = await this.core.getUserById(page.ownerId)
        const converted = convertCoreDbPage(page)
        return {
          ...converted,
          owner,
          viewUrl: converted?.urls?.[0],
          siteUrl: this.siteUrl(),
        }
      })
  }

  async getPageByUrl(url: string) {
    url = url?.trim()
    const parsed = parseUrl(url)
    if (!parsed) {
      this.logger.warn(`getPageByUrl: Empty or invalid url: ${url}`)
      throw new BadRequestException(`Empty or invalid url.`)
    }
    const { hostname, path } = parsed
    const found = await this.core.data.domain.findUnique({
      where: { name: hostname },
      include: {
        pages: {
          where: { path },
        },
      },
    })
    if (!found || !found.pages?.length) {
      const message = `Page not found on ${hostname}/${path}`
      this.logger.warn(`getPageByUrl: ${message}`)
      throw new NotFoundException(message)
    }

    return this.getPageById(found.pages[0].pageId)
  }

  siteUrl() {
    return this.core.config.webUrl
  }
}
