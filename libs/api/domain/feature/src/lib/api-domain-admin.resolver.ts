import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminCreateDomainInput,
  AdminListDomainInput,
  AdminUpdateDomainInput,
  ApiDomainAdminService,
  Domain,
} from '@pubkeyapp/api/domain/data-access'
import { Page } from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver(() => Domain)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiDomainAdminResolver {
  constructor(private readonly service: ApiDomainAdminService) {}

  @Mutation(() => Domain, { nullable: true })
  adminCreateDomain(@CtxUser() user: User, @Args('input') input: AdminCreateDomainInput) {
    return this.service.adminCreateDomain(user.id, input)
  }

  @Mutation(() => Domain, { nullable: true })
  adminDeleteDomain(@CtxUser() user: User, @Args('domainId') domainId: string) {
    return this.service.adminDeleteDomain(user.id, domainId)
  }

  @Query(() => [Domain], { nullable: true })
  adminDomains(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminListDomainInput,
      nullable: true,
    })
    input: AdminListDomainInput,
  ) {
    return this.service.adminDomains(user.id, input)
  }

  @Query(() => Domain, { nullable: true })
  adminDomain(@CtxUser() user: User, @Args('domainId') domainId: string) {
    return this.service.adminDomain(user.id, domainId)
  }

  @Mutation(() => Domain, { nullable: true })
  adminUpdateDomain(
    @CtxUser() user: User,
    @Args('domainId') domainId: string,
    @Args('input') input: AdminUpdateDomainInput,
  ) {
    return this.service.adminUpdateDomain(user.id, domainId, input)
  }

  @ResolveField(() => [Page], { nullable: true })
  pages(@Parent() domain: Domain) {
    return domain.pages.map((item: any) => item.page)
  }
}
