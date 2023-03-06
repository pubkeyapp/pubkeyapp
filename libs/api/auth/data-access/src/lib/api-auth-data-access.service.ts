import { ApiProperty } from '@nestjs/swagger'
import { getChallenge, verifySignature } from '@pubkeyapp/api/auth/util'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { IdentityProvider, UserRole } from '@prisma/client'
import { Request, Response } from 'express'
import { CoreUser } from '../../../../core/data-access/src/lib/api-core.helpers'
import { ResponseChallengeOptions } from './dto/auth-challenge-response.dto'

export interface AuthRequest extends Request {
  user?: { avatarUrl: string; id: string; name: string; username: string; role: UserRole }
}

export class RequestChallenge {
  @ApiProperty()
  challenge: string
  @ApiProperty()
  expiresAt: string
  @ApiProperty()
  publicKey: string
  @ApiProperty()
  message: string
}

@Injectable()
export class ApiAuthDataAccessService {
  private readonly jwtOptions: JwtSignOptions = {}

  private readonly logger = new Logger(ApiAuthDataAccessService.name)
  constructor(private readonly core: ApiCoreService, private jwt: JwtService) {}

  async login(req: AuthRequest, res: Response): Promise<CoreUser> {
    const user = req.user
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      sub: user.id,
    }

    const token = this.jwt.sign(payload)
    this.setCookie(req, res, token)
    return this.core.getUserById(user.id)
  }

  async requestChallenge(publicKey: string): Promise<RequestChallenge> {
    const { challenge, expiresAt } = getChallenge(publicKey)

    return { challenge, expiresAt, publicKey, message: `Sign in to ${this.core.config.appName}` }
  }

  async responseChallenge(req: AuthRequest, res: Response, input?: ResponseChallengeOptions) {
    req.user = await this.validateChallengeResponse(input)
    if (!req.user) {
      throw new UnauthorizedException()
    }
    return this.login(req, res)
  }

  resetCookie(req: AuthRequest, res: Response) {
    return res.clearCookie(this.core.config.cookieName, this.core.config.cookieOptions(req.hostname))
  }

  setCookie(req: AuthRequest, res: Response, token: string) {
    return res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(req.hostname))
  }

  sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload, this.jwtOptions)
  }

  async validateChallengeResponse(input: ResponseChallengeOptions): Promise<CoreUser> {
    const { challenge, publicKey, signature } = input

    if (!challenge || !publicKey || !signature) {
      throw new BadRequestException()
    }

    // Verify it
    const verified = verifySignature(publicKey, challenge, signature)

    if (!verified.success) {
      this.logger.error(`Challenge response failed: ${verified.message}`)
      throw false
    }
    const found = await this.findUserByIdentity({
      provider: IdentityProvider.Solana,
      providerId: publicKey,
    })
    // Find the identity we used
    const identity = found.identities.find(
      (i) => i.provider === IdentityProvider.Solana && i.providerId === publicKey && !i.verified,
    )
    if (identity) {
      console.log('Marking identity as verified', identity.id, publicKey, 'for user', found.username)
      await this.core.data.identity.update({
        where: { id: identity.id },
        data: { verified: true },
      })
    }
    this.logger.verbose(`User ${found.username} logged in with Solana identity ${publicKey}`)
    return found
  }

  async findUserByIdentity({
    provider,
    providerId,
  }: {
    provider: IdentityProvider
    providerId: string
  }): Promise<CoreUser> {
    const user = await this.core.data.findUserByIdentity({ provider, providerId })
    if (!user) {
      throw new NotFoundException(`User with identity ${provider}:${providerId} not found`)
    }
    return user
  }

  async findUserByUsername(username) {
    const user = await this.core.data.findUserByUsername(username)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  logout(req: AuthRequest, res: Response): Response {
    this.resetCookie(req, res)
    return res.send(true)
  }

  getUserById(id: string) {
    return this.core.getUserById(id)
  }
}
