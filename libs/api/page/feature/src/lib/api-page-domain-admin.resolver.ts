import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { AdminAddPageDomainInput, ApiAdminPageDomainService, PageDomain } from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiPageDomainAdminResolver {
  constructor(private readonly service: ApiAdminPageDomainService) {}

  @Mutation(() => PageDomain, { nullable: true })
  adminAddPageDomain(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('input') input: AdminAddPageDomainInput,
  ) {
    return this.service.adminAddPageDomain(user.id, pageId, input)
  }

  @Query(() => PageDomain, { nullable: true })
  adminPageDomain(@CtxUser() user: User, @Args('domainId') domainId: string, @Args('path') path: string) {
    return this.service.adminPageDomain(user.id, domainId, path)
  }

  @Mutation(() => PageDomain, { nullable: true })
  adminRemovePageDomain(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('pageDomainId') pageDomainId: string,
  ) {
    return this.service.adminRemovePageDomain(user.id, pageId, pageDomainId)
  }
}
