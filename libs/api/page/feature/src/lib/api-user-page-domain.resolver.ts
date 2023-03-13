import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserPageDomainService, PageDomain, UserAddPageDomainInput } from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserPageDomainResolver {
  constructor(private readonly service: ApiUserPageDomainService) {}

  @Mutation(() => PageDomain, { nullable: true })
  userAddPageDomain(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('input') input: UserAddPageDomainInput,
  ) {
    return this.service.userAddPageDomain(user.id, pageId, input)
  }

  @Query(() => PageDomain, { nullable: true })
  userGetPageDomain(@CtxUser() user: User, @Args('domainId') domainId: string, @Args('path') path: string) {
    return this.service.userGetPageDomain(user.id, domainId, path)
  }

  @Mutation(() => PageDomain, { nullable: true })
  userRemovePageDomain(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('pageDomainId') pageDomainId: string,
  ) {
    return this.service.userRemovePageDomain(user.id, pageId, pageDomainId)
  }
}
