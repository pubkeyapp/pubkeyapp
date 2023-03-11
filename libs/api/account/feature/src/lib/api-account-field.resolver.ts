import { UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Account } from '@pubkeyapp/api/account/data-access'
import { ApiAuthGraphqlGuard } from '@pubkeyapp/api/auth/data-access'

@Resolver(() => Account)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAccountFieldResolver {
  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() account: Account) {
    const postfix = `?cluster=${account?.network?.toLowerCase()}`

    return `/account/${account.address}${postfix}`
  }
}