import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { GatewayAppModule } from './app/gateway-app.module'

if (!process.env.PUBKEY_ENDPOINT) {
  throw new Error('PUBKEY_ENDPOINT is not defined')
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayAppModule)
  const port = process.env.GATEWAY_PORT || process.env.PORT || 3080
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}`)
}

void bootstrap()
