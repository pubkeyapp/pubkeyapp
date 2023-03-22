import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Page, PageBlock, PageBlockType, PubKeySdk } from '@pubkeyapp/sdk'
import fetch from 'cross-fetch'
import { existsSync } from 'fs-extra'
import LRUCache from 'lru-cache'
import { join } from 'path'

@Injectable()
export class GatewayService implements OnModuleInit {
  private readonly cache = new LRUCache<string, Page>({ ttl: 60 * 1000, max: 1000 })
  private readonly logger = new Logger(GatewayService.name)
  private readonly rootPath: string
  private sdk: PubKeySdk

  constructor() {
    this.rootPath = join(__dirname, '..', 'render')
    if (!existsSync(this.rootPath)) {
      this.logger.error(`Path to static content does not exist: ${this.rootPath}.`)
      process.exit()
    }
    this.logger.verbose(`Rendering static content from: ${this.rootPath}.`)
  }

  getAppUrl(): string {
    return this.sdk.appConfig.app.url
  }

  getDiscordUrl(): string {
    return 'https://discord.gg/XxuZQeDPNf'
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

  async getGithubDemoPage(username: string): Promise<Page | undefined> {
    const githubUser = await this.getGitHubUser(username)
    if (!githubUser) {
      return undefined
    }
    const hasTwitter = githubUser.twitter_username !== null
    const owner = {
      id: githubUser.id,
      profile: {
        name: githubUser.name,
        avatarUrl: githubUser.avatar_url,
        bio: githubUser.bio,
      },
    } as unknown as Page['owner']

    return {
      owner,
      color: this.getColor(githubUser.login),
      status: 'Demo',
      type: 'Personal',
      title: 'Demo page for GitHub user ' + githubUser.login,
      description: 'This can be your personal PubKey page!',
      blocks: [
        pageBlock('Header', { text: 'This can be your personal PubKey page!' }, 0),
        pageBlock(
          'Link',
          {
            icon: 'github',
            link: 'https://github.com/' + githubUser.login,
            label: 'GitHub',
          },
          1,
        ),
        hasTwitter
          ? pageBlock(
              'Link',
              {
                icon: 'twitter',
                link: 'https://twitter.com/' + githubUser.twitter_username,
                label: 'Twitter',
              },
              1,
            )
          : null,
      ].filter((block) => !!block),
    }
  }

  getRootPath(path: string) {
    return join(this.rootPath, path)
  }

  isStaticAsset(path: string, url: string): string | undefined {
    const extensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf']
    const isStaticFile = extensions.some((ext) => url.endsWith(ext))
    if (isStaticFile) {
      const staticFile = this.getRootPath(path)

      return existsSync(staticFile) ? staticFile : undefined
    }
    return undefined
  }

  private getColor(login: string) {
    const colors = [
      'red',
      'pink',
      'grape',
      'violet',
      'indigo',
      'blue',
      'cyan',
      'green',
      'lime',
      'yellow',
      'orange',
      'teal',
    ]

    return colors[login.length % colors.length]
  }

  private async getGitHubUser(username: string) {
    const data = await fetch(`https://api.github.com/users/${username}`)
    if (!data.ok) {
      return null
    }
    return data.json()
  }
}

export function pageBlock(type: PageBlockType, data: Record<string, string>, order = 0): PageBlock {
  switch (type) {
    case 'Header':
      return {
        id: 'header',
        name: 'Header',
        type: 'Header',
        data,
        order,
      }
    case 'Link':
      return {
        id: `link-${data.label.toLowerCase()}`,
        name: 'Link',
        type: 'Link',
        data,
        order,
      }
  }
}
