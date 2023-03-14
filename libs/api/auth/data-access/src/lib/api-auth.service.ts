import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { ApiProperty } from '@nestjs/swagger'
import { IdentityProvider, UserRole, UserStatus } from '@prisma/client'
import { getChallenge, verifySignature } from '@pubkeyapp/api/auth/util'
import { ApiCoreService, CoreUser } from '@pubkeyapp/api/core/data-access'
import { Request, Response } from 'express'
import { ResponseChallengeOptions } from './dto/auth-challenge-response.dto'

export interface AuthRequest extends Request {
  user?: CoreUser
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
export class ApiAuthService {
  private readonly jwtOptions: JwtSignOptions = {}

  private readonly logger = new Logger(ApiAuthService.name)
  constructor(readonly core: ApiCoreService, private jwt: JwtService) {}

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

    return {
      challenge,
      expiresAt,
      publicKey,
      message: `You are about to sign in to ${this.core.config.appName} running at ${this.core.config.webUrl}.`,
    }
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
    console.log(`verified`, verified)

    if (!verified.success) {
      this.logger.error(`Challenge response failed: ${verified.message}`)
      throw false
    }

    try {
      return this.findOrCreateSolanaIdentity(publicKey)
    } catch (e) {
      this.logger.error(`Failed to find or create user with Solana identity ${publicKey}`, e)
      throw new NotFoundException()
    }
  }

  private async findOrCreateSolanaIdentity(publicKey: string) {
    const found = await this.findUserByIdentity({
      provider: IdentityProvider.Solana,
      providerId: publicKey,
      reject: false,
    })

    if (!found) {
      this.logger.error(`User with Solana identity ${publicKey} not found, creating new user...`)
      await this.core.data.createUserWithSolanaIdentity(UserRole.User, UserStatus.Created, publicKey)
      return this.findOrCreateSolanaIdentity(publicKey)
    }

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
    reject = true,
  }: {
    provider: IdentityProvider
    providerId: string
    reject?: boolean
  }): Promise<CoreUser> {
    const user = await this.core.data.findUserByIdentity({ provider, providerId })
    if (!user && reject) {
      throw new Error(`User with identity ${provider}:${providerId} not found`)
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
