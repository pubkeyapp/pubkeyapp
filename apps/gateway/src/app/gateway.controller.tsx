import { createStylesServer, ServerStyles } from '@mantine/ssr'
import { Controller, Get, Logger, Req, Res } from '@nestjs/common'
import { Page } from '@pubkeyapp/sdk'
import { UiThemeProvider } from '@pubkeyapp/web/ui/theme'
import { Request, Response } from 'express'
import { readFileSync } from 'fs-extra'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { GatewayHtml } from '../views/gateway-html'
import { GatewayNotFound } from '../views/gateway-not-found'

import { GatewayService } from './gateway.service'

const stylesServer = createStylesServer()

@Controller()
export class GatewayController {
  private readonly logger = new Logger(GatewayController.name)
  constructor(private readonly service: GatewayService) {}

  @Get('*')
  async index(@Req() req: Request, @Res() res: Response) {
    const url = this.getUrlFromRequest(req)

    // Redirect to App if the URL is the root
    if (req.originalUrl === '/') {
      return res.redirect(this.service.getAppUrl())
    }

    // Redirect /u/{username}
    if (req.originalUrl.startsWith('/u/')) {
      return res.redirect(this.service.getAppUrl() + req.originalUrl)
    }

    // Redirect to Discord OAuth if the URL starts with /join-discord
    if (req.originalUrl.startsWith('/join-discord')) {
      return res.redirect(this.service.getDiscordUrl())
    }

    // Render a GitHub demo page if the URL starts with /github/
    if (req.originalUrl.startsWith('/github/')) {
      const username = req.originalUrl.replace('/github/', '')
      const page = await this.service.getGithubDemoPage(username)
      if (page) {
        return this.renderPage(res, page)
      }
      this.logger.warn(`Error fetching github user: ${username}`)
      return this.renderNotFound(req, res)
    }

    // Render a static file if the URL ends with a known extension
    const staticFile = this.service.isStaticAsset(req.path, url)
    if (staticFile) {
      return this.serveStatic(res, staticFile)
    }

    const found = await this.service.getPage(url)

    if (!found) {
      return this.renderNotFound(req, res)
    }

    return this.renderPage(res, found)
  }

  private serveStatic(res: Response, path: string) {
    res.sendFile(path)
  }

  private renderComponent(res: Response, component: React.ReactElement) {
    const content = renderToString(<UiThemeProvider>{component}</UiThemeProvider>)
    const html = renderToStaticMarkup(
      <GatewayHtml styles={<ServerStyles html={content} server={stylesServer} />}>{content}</GatewayHtml>,
    )

    res.send(`<!doctype html>\n${html}`)
  }

  private renderNotFound(req: Request, res: Response) {
    this.logger.warn(`Rendering 404 page: ${this.getUrlFromRequest(req)}`)
    return this.renderComponent(res, <GatewayNotFound app={this.service.getAppUrl()} />)
  }

  private renderPage(res: Response, page: Page) {
    const index = readFileSync(this.service.getRootPath('index.html'), { encoding: 'utf8' })
    const replace = [
      // Add hydrated page data to the window object
      { from: '</head>', to: `<script>window.pubkey = { page: ${JSON.stringify(page)} }</script></head>` },
      // Update the page title
      { from: '<title>PubKey</title>', to: `<title>${page.profile.username} | PubKey</title>` },
    ]

    const updated = replace.reduce((acc, { from, to }) => acc.replace(from, to), index)

    return res.send(updated)
  }

  private getUrlFromRequest(req: Request) {
    return `${req.protocol}://${req.get('host')}${req.originalUrl}`
  }
}
