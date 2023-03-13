import { Injectable, Logger } from '@nestjs/common'
import { NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { HeliusTransaction } from './entity/helius-transaction.entity'
import axios from 'axios'

@Injectable()
export class ApiUserHeliusService {
  private readonly logger = new Logger(ApiUserHeliusService.name)
  constructor(private readonly core: ApiCoreService) {
    this.logger.debug('ApiUserHeliusService')
  }

  async userGetHeliusTransactions(userId: string, network: NetworkType, address: string): Promise<HeliusTransaction[]> {
    await this.core.ensureUserActive(userId)

    if (network !== NetworkType.SolanaMainnet) {
      this.logger.verbose(`userGetHeliusTransactions: network ${network} not supported`)
      return []
    }

    const url = `https://api.helius.xyz/v0/addresses/${address}/transactions?api-key=${this.core.config.heliusApiKey}`

    const parseTransactions = async () => {
      const { data } = await axios.get(url)
      console.log('parsed transactions: ', data)
    }
    const res = await parseTransactions()
    console.log('userGetHeliusTransactions', address, res)
    return []
  }
}
