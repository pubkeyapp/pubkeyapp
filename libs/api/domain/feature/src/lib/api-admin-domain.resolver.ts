import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminCreateDomainInput,
  AdminGetDomainsInput,
  AdminUpdateDomainInput,
  ApiAdminDomainService,
  Domain,
} from '@pubkeyapp/api/domain/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminDomainResolver {
  constructor(private readonly service: ApiAdminDomainService) {}

  @Mutation(() => Domain, { nullable: true })
  adminCreateDomain(@CtxUser() user: User, @Args('input') input: AdminCreateDomainInput) {
    return this.service.adminCreateDomain(user.id, input)
  }

  @Mutation(() => Domain, { nullable: true })
  adminDeleteDomain(@CtxUser() user: User, @Args('domainId') domainId: string) {
    return this.service.adminDeleteDomain(user.id, domainId)
  }

  @Query(() => [Domain], { nullable: true })
  adminGetDomains(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminGetDomainsInput,
      nullable: true,
    })
    input: AdminGetDomainsInput,
  ) {
    return this.service.adminGetDomains(user.id, input)
  }

  @Query(() => Domain, { nullable: true })
  adminGetDomain(@CtxUser() user: User, @Args('domainId') domainId: string) {
    return this.service.adminGetDomain(user.id, domainId)
  }

  @Mutation(() => Domain, { nullable: true })
  adminUpdateDomain(
    @CtxUser() user: User,
    @Args('domainId') domainId: string,
    @Args('input') input: AdminUpdateDomainInput,
  ) {
    return this.service.adminUpdateDomain(user.id, domainId, input)
  }
}
