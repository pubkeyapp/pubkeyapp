import { createStylesServer, ServerStyles } from '@mantine/ssr'
import { Controller, Get, Logger, Req, Res } from '@nestjs/common'
import { UiThemeProvider } from '@pubkeyapp/web/ui/theme'
import { Request, Response } from 'express'
import { existsSync, readFileSync } from 'fs-extra'
import { join } from 'path'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { GatewayHtml } from '../views/gateway-html'
import { GatewayNotFound } from '../views/gateway-not-found'

import { AppService } from './app.service'

const stylesServer = createStylesServer()

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)
  private readonly rootPath: string
  constructor(private readonly service: AppService) {
    this.rootPath = join(__dirname, '..', 'render')
    if (!existsSync(this.rootPath)) {
      this.logger.error(`Path to static content does not exist: ${this.rootPath}.`)
      process.exit()
    }
    this.logger.verbose(`Rendering static content from: ${this.rootPath}.`)
  }

  @Get('*')
  async index(@Req() req: Request, @Res() res: Response) {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`

    const staticFile = this.isStaticAsset(req.path, url)

    if (staticFile) {
      return this.serveStatic(res, staticFile)
    }

    const found = await this.service.getPage(url)

    if (!found) {
      return this.renderComponent(res, <GatewayNotFound app={this.service.getAppUrl()} />)
    }

    const index = readFileSync(this.getRootPath('index.html'), { encoding: 'utf8' })

    const updated = index
      .replace(
        // Add hydrated page data to the window object
        '</head>',
        `<script>window.pubkey = { page: ${JSON.stringify(found)} }</script></head>`,
      )
      .replace(
        // Update the page title
        '<title>PubKey</title>',
        `<title>${found.title} | PubKey</title>`,
      )

    return res.send(updated)
  }

  private getRootPath(path: string) {
    return join(this.rootPath, path)
  }
  private serveStatic(res: Response, path: string) {
    res.sendFile(path)
  }

  private isStaticAsset(path: string, url: string): string | undefined {
    const extensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf']
    const isStaticFile = extensions.some((ext) => url.endsWith(ext))
    if (isStaticFile) {
      const staticFile = this.getRootPath(path)

      return existsSync(staticFile) ? staticFile : undefined
    }
    return undefined
  }

  private renderComponent(res: Response, component: React.ReactElement) {
    const content = renderToString(<UiThemeProvider>{component}</UiThemeProvider>)
    const html = renderToStaticMarkup(
      <GatewayHtml styles={<ServerStyles html={content} server={stylesServer} />}>{content}</GatewayHtml>,
    )

    res.send(`<!doctype html>\n${html}`)
  }
}
