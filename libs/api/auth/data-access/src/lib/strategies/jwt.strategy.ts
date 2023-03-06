import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

function headerAndCookieExtractor(req: Request) {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
  if (!token) {
    return cookieExtractor(req.cookies)
  }
  return token
}

export function cookieExtractor(cookies: Record<string, string>) {
  const name = process.env.COOKIE_NAME
  console.log(`cookies[name] = ${cookies?.[name]}`)
  return cookies?.[name] ? cookies[name] : undefined
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly core: ApiCoreService) {
    super({
      jwtFromRequest: headerAndCookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    })
  }

  async validate(payload: { sub: string }) {
    if (!payload.sub) {
      return null
    }
    return this.core.getUserById(payload.sub)
  }
}
