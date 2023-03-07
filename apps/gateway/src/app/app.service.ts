import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Page, PubKeySdk } from '@pubkeyapp/sdk'
import LRUCache from 'lru-cache'

@Injectable()
export class AppService implements OnModuleInit {
  private readonly cache = new LRUCache<string, Page>({ ttl: 60 * 1000, max: 1000 })
  private readonly logger = new Logger(AppService.name)
  private sdk: PubKeySdk

  getAppUrl(): string {
    return this.sdk.appConfig.app.url
  }
  async getPage(url: string): Promise<Page | null> {
    const cached = this.cache.get(url)
    if (cached) {
      this.logger.debug(`getPage: Cache hit: ${url}`)
      return cached
    }
    try {
      const page = await this.sdk.getPageByUrl(url)
      if (page) {
        this.logger.debug(`getPage: Cache miss: ${url}`)
        this.cache.set(url, page)
        return page
      }
    } catch (error) {
      this.logger.debug(`getPage: Error: ${error.message}`)
      return null
    }
    this.logger.debug(`getPage: Page not found: ${url}`)
    return null
  }

  async onModuleInit(): Promise<void> {
    this.sdk = await PubKeySdk.setup({ endpoint: process.env.PUBKEY_ENDPOINT, logger: console })
  }
}
