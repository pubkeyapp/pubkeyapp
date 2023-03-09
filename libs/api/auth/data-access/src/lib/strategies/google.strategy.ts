import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Profile, Strategy } from 'passport-google-oauth20'
import { ApiAuthService, AuthRequest } from '../api-auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly provider = IdentityProvider.Google
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: core.config.webUrl + '/api/auth/google/callback',
      passReqToCallback: true,
      prompt: 'consent',
      accessType: 'offline',
      scope: ['email', 'profile'],
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
    await this.core.data.identity.create({
      data: {
        ownerId: req.user.id,
        provider: this.provider,
        providerId: profile.id,
        verified: profile._json.email_verified,
        profile: {
          externalId: profile.id,
          email: profile.emails?.[0].value,
          username: profile.displayName,
          name: profile.name ? `${profile.name.givenName} ${profile.name.familyName}`.trim() : undefined,
          avatarUrl: profile.photos?.[0].value,
          // __raw: profile,
        },
      },
    })

    return this.core.getUserById(req.user.id, true)
  }
}
