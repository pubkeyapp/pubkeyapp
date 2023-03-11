import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserSearchService, SearchResult, UserSearchInput } from '@pubkeyapp/api/search/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserSearchResolver {
  constructor(private readonly service: ApiUserSearchService) {}

  @Mutation(() => SearchResult, { nullable: true })
  userSearch(@CtxUser() user: User, @Args('input') input: UserSearchInput) {
    return this.service.userSearch(user.id, input)
  }
}
