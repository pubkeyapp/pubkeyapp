import { Connection, PublicKey } from '@solana/web3.js'
import { ClusterType } from './entity/cluster-type.enum'

export const SOLANA_SYSTEM_PROGRAM_ID = '11111111111111111111111111111111'

export interface AccountInfo {
  account: string
  isMint: boolean
  isOwner: boolean
  isSystemAccount: boolean
  isTokenAccount: boolean
  owner?: string | undefined
  program?: string | undefined
  raw?: any
}

export interface SolanaConfig {
  type: ClusterType
  connection: Connection
  explorerUrl: string
}
export class Solana {
  connection: Connection

  constructor(private readonly config: SolanaConfig) {
    this.connection = config.connection
  }

  getExplorerUrl(path: string) {
    return this.config.explorerUrl.replace('{path}', path)
  }

  async getAccountInfo(address: string): Promise<AccountInfo> {
    const account = new PublicKey(address)
    const accountInfo = await this.connection.getParsedAccountInfo(account, { commitment: 'confirmed' })

    if (!accountInfo) {
      throw new Error('Account not found')
    }

    const parsed = (accountInfo.value as any)?.data?.parsed
    const program = accountInfo?.value?.owner?.toString() ?? undefined
    const owner = parsed?.info.owner

    const isMint = parsed?.type === 'mint'
    const isSystemAccount = program === SOLANA_SYSTEM_PROGRAM_ID
    const isTokenAccount = parsed?.type === 'account'

    const result = {
      account: account.toString(),
      isMint,
      isOwner: false,
      isSystemAccount,
      isTokenAccount,
      owner,
      program,
      raw: accountInfo,
    }

    return result
  }
}
