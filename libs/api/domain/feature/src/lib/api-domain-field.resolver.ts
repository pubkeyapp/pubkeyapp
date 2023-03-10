import { UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard } from '@pubkeyapp/api/auth/data-access'
import { ApiAdminDomainService, Domain } from '@pubkeyapp/api/domain/data-access'
import { Page } from '@pubkeyapp/api/page/data-access'

@Resolver(() => Domain)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiDomainFieldResolver {
  @ResolveField(() => [Page], { nullable: true })
  pages(@Parent() domain: Domain) {
    return domain.pages.map((item: any) => item.page)
  }
}
