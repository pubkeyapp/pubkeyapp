import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Profile, Strategy } from 'passport-twitter'
import { ApiAuthService, AuthRequest } from '../api-auth.service'

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  private readonly provider = IdentityProvider.Twitter
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_KEY_SECRET,
      callbackURL: core.config.webUrl + '/api/auth/twitter/callback',
      passReqToCallback: true,
    })
  }

  async validate(req: AuthRequest, accessToken: string, refreshToken: string, profile: Profile) {
    // Make sure the user is active
    await this.core.ensureUserActive(req.user.id)
    // Get the user by their identity
    const found = await this.service.findUserByIdentity({
      provider: this.provider,
      providerId: profile.id,
      reject: false,
    })
    if (found) {
      return found
    }

    const avatarUrl = profile.photos?.[0]?.value
    await this.core.data.identity.create({
      data: {
        ownerId: req.user.id,
        provider: this.provider,
        providerId: profile.id,
        verified: true,
        profile: {
          externalId: profile.id,
          email: profile.email,
          username: profile.username,
          name: profile.display_name,
          avatarUrl,
          verified: profile.verified,
          __raw: profile,
        },
      },
    })

    return this.core.getUserById(req.user.id, true)
  }
}
