import { Account, Identity, IdentityProvider, Profile, User } from '@prisma/client'
import { getSolanaName } from 'sol-namor/src'

export type CoreDbUser = User & {
  identities: Identity[]
  profile?: Profile
  profiles: Profile[]
}

export type CoreIdentity = {
  id: string
  provider: IdentityProvider
  providerId: string
  profile?: unknown
  verified: boolean
}

export type CoreUser = Omit<CoreDbUser, 'identities'> & {
  gumUser?: Account
  identities: CoreIdentity[]
  identity: CoreIdentity
  publicKey: string
  profileUrl: string
}

export function convertCoreDbUser(user: CoreDbUser): CoreUser {
  user.inviteId = undefined

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
    publicKey,
    identities,
    identity: identities.find(
      (identity) => identity.provider === IdentityProvider.Solana && identity.providerId === publicKey,
    ),
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

export function getUsername(name: string) {
  if (name.length > 30) {
    return getSolanaName(name).split(' ').join('-').toLowerCase()
  }
  return name
}

export function slugify(name: string) {
  return name.replace(/[^a-z0-9]/gi, '')
}

export function getProfileUsername(username: string) {
  return slugify(username).substring(0, 15)
}
