import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Domain } from '@pubkeyapp/api/domain/data-access'
import { PageDomain } from '@pubkeyapp/api/page/data-access'

@Resolver(() => PageDomain)
export class ApiPageDomainResolver {
  @ResolveField(() => String, { nullable: true })
  viewUrl(@Parent() pageDomain: PageDomain) {
    return pageDomain?.domain ? Domain.url(pageDomain.domain, pageDomain.path) : null
  }
}
