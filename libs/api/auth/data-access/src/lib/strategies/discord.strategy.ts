import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider, UserRole } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Profile, Strategy } from 'passport-discord'
import { getUsername } from '../../../../../core/data-access/src/lib/data/api-core-data.service'
import { ApiAuthService } from '../api-auth.service'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: core.config.webUrl + '/api/auth/discord/callback',
      scope: ['identify', 'email'],
      passReqToCallback: true,
    })
  }

  async validate(req, accessToken: string, refreshToken: string, profile: Profile) {
    // Make sure the user is active
    await this.core.ensureUserActive(req.user.id)
    // Get the user by their identity
    const found = await this.service.findUserByIdentity({
      provider: IdentityProvider.Discord,
      providerId: profile.id,
      reject: false,
    })
    if (found) {
      return found
    }

    const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=512`
    const bannerUrl = `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png?size=512`

    await this.core.data.identity.create({
      data: {
        ownerId: req.user.id,
        provider: IdentityProvider.Discord,
        providerId: profile.id,
        verified: profile.verified,
        profile: {
          externalId: profile.id,
          email: profile.email,
          username: `${profile.username}#${profile.discriminator}`,
          name: profile.display_name,
          avatarUrl,
          bannerUrl,
          verified: profile.verified,
        },
      },
    })

    return this.core.getUserById(req.user.id, true)
  }
}
