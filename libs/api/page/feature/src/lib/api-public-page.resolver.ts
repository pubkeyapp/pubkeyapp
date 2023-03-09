import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Domain } from '@pubkeyapp/api/domain/data-access'
import { ApiPublicPageService, Page } from '@pubkeyapp/api/page/data-access'
import { Profile } from '@pubkeyapp/api/profile/data-access'

@Resolver(() => Page)
export class ApiPublicPageResolver {
  constructor(private readonly service: ApiPublicPageService) {}

  @Query(() => Page, { nullable: true })
  publicPage(@Args('pageId') pageId: string) {
    return this.service.getPageById(pageId)
  }

  @ResolveField(() => String, { nullable: true })
  siteUrl(@Parent() page: Page) {
    return this.service.siteUrl()
  }

  @ResolveField(() => String, { nullable: true })
  viewUrl(@Parent() page: Page) {
    if (!page.domains?.length || !page.domains[0].domain) {
      return ['/p/', page.id, '/preview/'].join('')
    }
    const { domain, path } = page.domains[0]
    return Domain.url(domain, path)
  }

  @ResolveField(() => Profile, { nullable: true })
  profile(@Parent() page: Page) {
    return page?.profile
  }
}
