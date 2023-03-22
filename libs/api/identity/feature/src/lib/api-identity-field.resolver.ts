import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { IdentityProvider } from '@prisma/client'
import { Account } from '@pubkeyapp/api/account/data-access'
import { ellipsify } from '@pubkeyapp/api/core/data-access'
import { ApiUserIdentityService, Identity } from '@pubkeyapp/api/identity/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => Identity)
export class ApiIdentityFieldResolver {
  constructor(private readonly service: ApiUserIdentityService) {}

  @ResolveField(() => User, { nullable: true })
  owner(@Parent() identity: Identity) {
    return this.service.core.getUserById(identity.ownerId)
  }

  @ResolveField(() => String, { nullable: true })
  name(@Parent() identity: Identity) {
    switch (identity.provider) {
      case IdentityProvider.Github:
        return (identity.profile as { username: string }).username
      case IdentityProvider.Twitter:
        return (identity.profile as { username: string }).username
      case IdentityProvider.Discord:
        return (identity.profile as { username: string }).username
      case IdentityProvider.Google:
        return (identity.profile as { email: string }).email
      case IdentityProvider.Solana:
        return ellipsify(identity.providerId)
    }
    return identity.providerId
  }

  @ResolveField(() => String, { nullable: true })
  link(@Parent() identity: Identity) {
    switch (identity.provider) {
      case IdentityProvider.Github:
        return `https://github.com/${this.name(identity)}`
      case IdentityProvider.Twitter:
        return `https://twitter.com/${this.name(identity)}`
      case IdentityProvider.Discord:
        return `https://discordapp.com/users/${identity.providerId}`
      case IdentityProvider.Google:
        return `mailto:${this.name(identity)}`
      case IdentityProvider.Solana:
        return `https://solscan.io/address/${identity.providerId}`
    }
    return null
  }

  @ResolveField(() => [Account], { nullable: true })
  accounts(@Parent() identity: Identity) {
    return identity.accounts
  }
}
