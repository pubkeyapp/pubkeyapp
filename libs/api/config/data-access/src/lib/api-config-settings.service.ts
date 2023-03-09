import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { clusterApiUrl } from '@solana/web3.js'
import { Setting } from './entity/setting.entity'

export const DEFAULT_SETTINGS: { [key: string]: Omit<Prisma.SettingCreateInput, 'key'> } = {
  'solana:devnet:endpoint': {
    default: process.env.SOLANA_DEVNET_ENDPOINT || clusterApiUrl('devnet'),
    description: 'Solana Devnet Endpoint',
  },
  'solana:devnet:explorerUrl': {
    default: 'https://solscan.io/{path}?cluster=devnet',
    description: 'Solana Devnet Explorer',
  },
  'solana:mainnet:endpoint': {
    default: process.env.SOLANA_DEVNET_ENDPOINT || clusterApiUrl('mainnet-beta'),
    description: 'Solana Mainnet Endpoint',
  },
  'solana:mainnet:explorerUrl': {
    default: 'https://solscan.io/{path}',
    description: 'Solana Mainnet Explorer',
  },
}

export type ApiSettingType = keyof typeof DEFAULT_SETTINGS

@Injectable()
export class ApiConfigSettingsService {
  private readonly logger = new Logger(ApiConfigSettingsService.name)

  readonly map = new Map<ApiSettingType, Setting>()
  readonly values = new Map<ApiSettingType, string>()

  get keys(): string[] {
    return Object.keys(DEFAULT_SETTINGS)
  }

  get provisioned(): Prisma.SettingCreateInput[] {
    return Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, ...value }))
  }

  clear() {
    this.map.clear()
  }

  set(setting: Setting) {
    const value = setting.value?.length > 1 ? setting.value : DEFAULT_SETTINGS[setting.key].default
    this.map.set(setting.key, { ...setting, value })
    this.values.set(setting.key, value)
  }

  get(key: ApiSettingType) {
    const value = this.values.get(key)
    if (!value) {
      this.logger.warn(`Setting ${key} not found`)
      return null
    }
    return this.values.get(key)
  }
}
