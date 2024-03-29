import { UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Account } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard } from '@pubkeyapp/api/auth/data-access'
import { Identity } from '@pubkeyapp/api/identity/data-access'
import { Profile } from '@pubkeyapp/api/profile/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => Account)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAccountFieldResolver {
  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() account: Account) {
    const postfix = `?cluster=${account?.network?.toLowerCase()}`

    return `/account/${account.address}${postfix}`
  }

  @ResolveField(() => Profile, { nullable: true })
  gumProfile(@Parent() account: Account) {
    return account?.gumProfile
  }

  @ResolveField(() => Profile, { nullable: true })
  gumProfileMeta(@Parent() account: Account) {
    return account?.gumProfileMeta
  }

  @ResolveField(() => User, { nullable: true })
  gumUser(@Parent() account: Account) {
    return account?.gumUser
  }

  @ResolveField(() => User, { nullable: true })
  discoveredBy(@Parent() account: Account) {
    return account?.discoveredBy
  }

  @ResolveField(() => Identity, { nullable: true })
  identity(@Parent() account: Account) {
    return account?.identity
  }
}
