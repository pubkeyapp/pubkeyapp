import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import fetch from 'node-fetch'
import { Profile, Strategy } from 'passport-github'
import { ApiAuthService, AuthRequest } from '../api-auth.service'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  private readonly provider = IdentityProvider.Github
  constructor(private core: ApiCoreService, private service: ApiAuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: core.config.webUrl + '/api/auth/github/callback',
      scope: ['public_profile', 'user:email'],
      profilePath: 'https://api.github.com/user',
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
    const email = await this.getGithubEmail(accessToken)
    await this.core.data.identity.create({
      data: {
        ownerId: req.user.id,
        provider: this.provider,
        providerId: profile.id,
        verified: true,
        profile: {
          externalId: profile.id,
          email,
          username: profile.username,
          name: profile.displayName,
          bio: profile.bio,
          company: profile.company,
          blog: profile.blog,
          location: profile.location,
          publicEmail: profile.email,
          hireable: profile.hireable,
          twitter_username: profile.twitter_username,
          avatarUrl: profile.avatar_url ?? profile.photos.length ? profile.photos[0].value : undefined,
          // __raw: profile,
        },
      },
    })

    return this.core.getUserById(req.user.id, true)
  }

  private getGithubEmail(accessToken): Promise<string | undefined> {
    return fetch('https://api.github.com/user/emails', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json() as Promise<{ email: string; primary: boolean; verified: boolean }[]>)
      .then((res) => res.find((item) => item.primary === true && item.verified === true).email)
  }
}
