import { Identity, IdentityProvider, User } from '@prisma/client'

export type CoreDbUser = User & {
  identities: Identity[]
}

export type CoreIdentity = {
  id: string
  provider: IdentityProvider
  providerId: string
  profile?: unknown
  verified: boolean
}
export type CoreUser = Omit<CoreDbUser, 'identities'> & {
  identities: CoreIdentity[]
  avatar?: string
  publicKey: string
  metaUrl: string
  profileUrl: string
}

export function convertCoreDbUser(user: CoreDbUser, apiUrl: string): CoreUser {
  user.inviteId = undefined
  user.updatedAt = undefined
  user.avatarUrl = user.avatarUrl ? user.avatarUrl : getAvatarUrl(user.username)

  const identities: CoreIdentity[] = user.identities.map((identity) => {
    return {
      id: identity.id,
      provider: identity.provider,
      providerId: identity.providerId,
      profile: identity.profile,
      verified: identity.verified ? identity.verified : false,
    }
  })
  const publicKey = identities.find((identity) => identity.provider === IdentityProvider.Solana)?.providerId
  return {
    ...user,
    name: user.name ? user.name : ellipsify(user.username),
    avatar: user.avatarUrl,
    bio: user.bio ? user.bio : 'No bio found :(',
    publicKey,
    identities,
    metaUrl: `${apiUrl}/user/meta/${user.username}`,
    profileUrl: `/u/${user.username}`,
  }
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

export function getAvatarUrl(name: string) {
  return `https://source.boringavatars.com/pixel/400/${name}?colors=FEED5B,6260FF,29DBD1,C061F7,FF6F5B`
}
