import { AxiosRequestConfig } from 'axios'
import {
  AuthApi,
  Config,
  ConfigApi,
  Configuration,
  Page,
  PageApi,
  ResponseChallengeOptions,
  User,
  UserApi,
} from '../generated'
import { PubKeySdkConfig, tag } from './pub-key-sdk'

export class PubKeySdkInternal {
  private readonly authApi: AuthApi
  private readonly configApi: ConfigApi
  private readonly pageApi: PageApi
  private readonly userApi: UserApi
  appConfig: Config | undefined
  constructor(readonly sdkConfig: PubKeySdkConfig) {
    // Create the API Configuration
    const apiConfig = new Configuration({
      baseOptions: this.apiBaseOptions(this.sdkConfig.headers),
      basePath: sdkConfig.endpoint,
    })

    // Configure the APIs
    this.authApi = new AuthApi(apiConfig)
    this.configApi = new ConfigApi(apiConfig)
    this.pageApi = new PageApi(apiConfig)
    this.userApi = new UserApi(apiConfig)
  }

  getConfig() {
    return this.configApi
      .getConfig()
      .then((res) => res.data)
      .then((appConfig) => {
        this.appConfig = appConfig
        return this.appConfig
      })
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getPageById(pageId: string): Promise<Page> {
    return this.pageApi
      .getPageById(pageId)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getPageByUrl(url: string): Promise<Page> {
    return this.pageApi
      .getPageByUrl(url)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getUserById(userId: string): Promise<User> {
    return this.userApi
      .getUserById(userId)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  getUserByUsername(username: string): Promise<User> {
    return this.userApi
      .getUserByUsername(username)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  logout(): Promise<boolean> {
    return this.authApi
      .logout()
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  me(): Promise<User | undefined> {
    return this.authApi
      .me()
      .then((res) => res.data)
      .catch((err) => {
        this.sdkConfig.logger?.error(`Not authenticated: ${err}`)
        return undefined
      })
  }

  requestChallenge(publicKey: string) {
    return this.authApi
      .requestChallenge(publicKey)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  respondChallenge(input: ResponseChallengeOptions) {
    return this.authApi
      .respondChallenge(input)
      .then((res) => {
        console.log(res)
        return res.data
      })
      .catch((err) => {
        throw new Error(err?.response?.data?.message ?? 'Unknown error')
      })
  }

  private apiBaseOptions(headers: Record<string, string> = {}): AxiosRequestConfig {
    return {
      withCredentials: true,
      headers: {
        ...headers,
        Authorization: `Bearer ${this.sdkConfig.token}`,
        'pubkey-user-agent': `${tag()}`,
      },
    }
  }
}
