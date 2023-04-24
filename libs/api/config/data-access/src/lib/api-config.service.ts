import { INestApplication, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClusterType } from '@pubkeyapp/solana'

import { CookieOptions } from 'express-serve-static-core'
import * as fs from 'fs'
import { RedisOptions } from 'ioredis'
import { ApiConfigSettingsService } from './api-config-settings.service'

import { Config } from './entity/config.entity'

@Injectable()
export class ApiConfigService {
  private readonly logger = new Logger(ApiConfigService.name)
  constructor(private readonly config: ConfigService, readonly settings: ApiConfigSettingsService) {}

  get apiLogColor() {
    return this.config.get('api.log.color')
  }

  get apiLogJson() {
    return this.config.get('api.log.json')
  }

  get apiLogLevel() {
    return this.config.get('api.log.level')
  }

  get apiName(): string {
    return this.config.get('api.name')
  }

  get apiVersion(): string {
    return this.config.get('api.version')
  }

  get apiUrl(): string {
    return this.config.get('api.url')
  }

  get appDescription(): string {
    return this.config.get('app.description')
  }

  get appName(): string {
    return this.config.get('app.name')
  }

  get aptEndpoint(): string {
    return this.config.get('atp.endpoint')
  }

  get aptIdentifier(): string {
    return this.config.get('atp.identifier')
  }

  get aptPassword(): string {
    return this.config.get('atp.password')
  }

  get cookieDomains(): string[] {
    return this.config.get('cookie.domains')
  }

  get cookieName(): string {
    return this.config.get('cookie.name')
  }

  cookieOptions(hostname: string): CookieOptions {
    const found = this.cookieDomains.find((domain) => hostname.endsWith(domain))
    if (!found) {
      this.logger.warn(
        `Not configured to set cookies for ${hostname}. cookieDomains: ${
          this.cookieDomains.length ? this.cookieDomains.join(', ') : 'not configured'
        }`,
      )
    }
    const isSecure = this.apiUrl.startsWith('https')
    return {
      httpOnly: false,
      secure: isSecure,
      domain: found || this.cookieDomains[0],
      sameSite: isSecure ? 'none' : 'strict',
    }
  }

  get cors() {
    return {
      credentials: true,
      origin: (origin, callback) => callback(null, this.corsBypass ? origin : this.corsOrigins),
    }
  }

  get corsBypass(): boolean {
    return this.config.get('cors.bypass')
  }

  get corsOrigins(): string[] {
    return this.config.get('cors.origins')
  }

  get environment() {
    return this.config.get('environment')
  }
  async getConfig(): Promise<Config> {
    return {
      api: {
        name: this.apiName,
        url: this.apiUrl,
        version: this.apiVersion,
      },
      app: {
        name: this.appName,
        description: this.appDescription,
        url: this.webUrl,
      },
      // cluster: clusterDevnet,
      // clusters: [clusterDevnet, clusterMainnet],
    }
  }

  get isDevelopment(): boolean {
    return this.environment === 'development'
  }

  get isProduction(): boolean {
    return this.environment === 'production'
  }

  get heliusApiKey() {
    return this.config.get('helius.apiKey')
  }

  get host() {
    return this.config.get('host')
  }

  get port() {
    return this.config.get('port')
  }

  get prefix() {
    return 'api'
  }

  get redirectSsl() {
    return this.config.get('redirectSsl')
  }

  get redisOptions(): RedisOptions {
    // Parse the Redis URL to get the host, port, and password, etc.
    const parsed = new URL(this.redisUrl)

    // The URL class encodes the password if it contains special characters, so we need to decode it.
    // https://nodejs.org/dist/latest-v18.x/docs/api/url.html#urlpassword
    // This caused an issue because Azure Cache for Redis generates passwords that end with an equals sign.
    const password = parsed.password ? decodeURIComponent(parsed.password) : undefined

    return {
      host: parsed.hostname,
      port: Number(parsed.port),
      password: password,
      username: parsed.username,
      tls: parsed.protocol?.startsWith('rediss')
        ? {
            rejectUnauthorized: false,
          }
        : undefined,
    }
  }

  get redisUrl() {
    return this.config.get('redis.url')
  }

  get webUrl(): string {
    return this.config.get('web.url')
  }

  provisionAdminPublicKeys() {
    return this.config.get<string[]>('provision.user.Admin')
  }
  provisionUserPublicKeys() {
    return this.config.get<string[]>('provision.user.User')
  }

  configureSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .addServer(this.apiUrl.replace('/api', ''))
      .addTag('PubKey')
      .setDescription('The Social Solana Explorer')
      .setTitle(this.apiName)
      .setVersion(this.apiVersion)
      .addCookieAuth(this.cookieName)
      .build()
    const document = SwaggerModule.createDocument(app, config)
    if (this.isDevelopment) {
      this.logger.warn('Writing swagger.json')
      fs.writeFileSync('./api-swagger.json', JSON.stringify(document, null, 2))
    }
    SwaggerModule.setup(this.prefix, app, document)
  }
}
