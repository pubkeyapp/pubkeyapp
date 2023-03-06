import { ResponseChallengeOptions } from '@pubkeyapp/api/auth/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom'

import { ApiAuthDataAccessService } from '../api-auth-data-access.service'

@Injectable()
export class SolanaStrategy extends PassportStrategy(Strategy, 'solana') {
  private readonly logger = new Logger(SolanaStrategy.name)
  constructor(private auth: ApiAuthDataAccessService) {
    super()
  }

  async validate(req): Promise<any> {
    const { challenge, publicKey, signature }: ResponseChallengeOptions = req.body
    this.logger.debug(`validate: ${challenge} ${publicKey} ${signature}`)

    return this.auth.validateChallengeResponse({ challenge, publicKey, signature })
  }
}
