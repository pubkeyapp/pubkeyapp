import { Cluster, Solana } from '@pubkeyapp/solana'
import { Connection } from '@solana/web3.js'
import { Config, Page, RequestChallenge, ResponseChallengeOptions, User } from '../generated'
import { PubKeySdkInternal } from './pub-key-sdk-internal'

export const NAME = `PubKey TypeScript SDK`
export const VERSION = `dev`

export function tag(): string {
  return `${NAME}@${VERSION}`
}

export interface PubKeySdkLogger {
  log: (message: string, ...params: any[]) => void
  error: (message: string, ...params: any[]) => void
}
export interface PubKeySdkConfig {
  endpoint: string
  headers?: Record<string, string>
  logger?: PubKeySdkLogger
  token?: string
}

export class PubKeySdk {
  private readonly internal: PubKeySdkInternal
  solana: Solana | undefined
  constructor(readonly config: PubKeySdkConfig) {
    this.internal = new PubKeySdkInternal(config)
    this.config.logger = this.config.logger || {
      log: (message: string, ...params: any[]) => console.log(message, ...params),
      error: (message: string, ...params: any[]) => console.error(message, ...params),
    }
  }

  get appConfig(): Config | undefined {
    return this.internal.appConfig
  }

  getPageById(pageId: string): Promise<Page> {
    return this.internal.getPageById(pageId)
  }

  getPageByUrl(url: string): Promise<Page> {
    return this.internal.getPageByUrl(url)
  }

  getUserById(userId: string): Promise<User> {
    return this.internal.getUserById(userId)
  }
  getUserByUsername(userName: string): Promise<User> {
    return this.internal.getUserByUsername(userName)
  }

  logout(): Promise<boolean> {
    return this.internal.logout()
  }

  me(): Promise<User | undefined> {
    return this.internal.me()
  }

  requestChallenge(publicKey: string): Promise<RequestChallenge> {
    return this.internal.requestChallenge(publicKey)
  }

  respondChallenge(options: ResponseChallengeOptions): Promise<User> {
    return this.internal.respondChallenge(options)
  }

  async init() {
    try {
      this.config?.logger?.log(`${tag()}: initializing SDK: ${this.config.endpoint}`)

      const config = await this.internal.getConfig()
      // const { endpoint, type, explorerUrl } = config.cluster as Cluster

      // const connection = new Connection(endpoint, 'confirmed')
      // this.solana = new Solana({ type, connection, explorerUrl })
      // this.config?.logger?.log(`${tag()}: connected to '${type}', endpoint '${endpoint}'`)
    } catch (e) {
      console.error(`${tag()}: Error initializing SDK: ${e}`)
      this.config?.logger?.error(`Error initializing Server: ${e}`)
      throw new Error(`Error initializing Server.`)
    }
  }

  static async setup(config: PubKeySdkConfig): Promise<PubKeySdk> {
    const sdk = new PubKeySdk(validatePubKeySdkConfig(config))
    try {
      return sdk.init().then(() => {
        config.logger?.log(`${tag()}: Setup done.`)
        return sdk
      })
    } catch (e) {
      console.error(`${tag()}: Error setting up SDK: ${e}`)
      config.logger?.error(`${tag()}: Error setting up SDK.`, e)
      throw new Error(`${tag()}: Error setting up SDK.`)
    }
  }
}

function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '')
}

/**
 * This method accepts a PubKey Sdk Config and will fill in any missing defaults
 * @param {PubKeySdkConfig} config
 * @returns {PubKeySdkConfig}
 */
export function validatePubKeySdkConfig(config: PubKeySdkConfig): PubKeySdkConfig {
  if (!config.endpoint) {
    throw new Error(`validatePubKeySdkConfig: no endpoint configured.`)
  }
  if (!config.endpoint.startsWith('http')) {
    throw new Error(`validatePubKeySdkConfig: the endpoint should start with http or https.`)
  }
  if (config.endpoint.endsWith('/api')) {
    config.endpoint = config.endpoint.replace(/\/api$/, '')
  }
  return {
    ...config,
    endpoint: removeTrailingSlash(config.endpoint),
  }
}
