import { ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { OgmaService } from '@ogma/nestjs-module'
import { exec } from 'child_process'
import cookieParser from 'cookie-parser'
import redirectSSL from 'redirect-ssl'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get(ApiConfigService)
  const logger = app.get<OgmaService>(OgmaService)
  app.useLogger(logger)
  app.setGlobalPrefix(config.prefix)
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false, transform: true }))
  app.enableCors(config.cors)
  app.use(redirectSSL.create({ enabled: config.redirectSsl }))
  config.configureSwagger(app)
  app.use(cookieParser())

  const host = `http://${config.host}:${config.port}`
  try {
    await app.listen(config.port, config.host)
    Logger.log(`🚀 API is listening on ${host}/${config.prefix}.`)
    Logger.log(`🚀 Admin API is listening on ${host}/graphql.`)
    Logger.log(`🔋 API_URL: ${config.apiUrl}`)
    Logger.log(`🔋 WEB_URL: ${config.webUrl}`)
    Logger.log(`🔋 COOKIE_DOMAINS: ${config.cookieDomains.join(', ')}`)
    Logger.log(
      `🔋 CORS: ${
        config.corsBypass
          ? 'Bypassed'
          : config?.corsOrigins
          ? `enabled for: ${Array.isArray(config?.corsOrigins) ? config?.corsOrigins?.join(', ') : config?.corsOrigins}`
          : 'disabled'
      }`,
    )
    if (config.isDevelopment) {
      exec('prettier --write ./api-schema.graphql', { cwd: process.cwd() })
    }
  } catch (e) {
    Logger.error(e)
    console.log(e)
  }
}

bootstrap()
