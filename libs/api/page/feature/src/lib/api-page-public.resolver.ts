import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Domain } from '@pubkeyapp/api/domain/data-access'
import { ApiPagePublicService, Page } from '@pubkeyapp/api/page/data-access'

@Resolver(() => Page)
export class ApiPagePublicResolver {
  constructor(private readonly service: ApiPagePublicService) {}

  @Query(() => Page, { nullable: true })
  publicPage(@Args('pageId') pageId: string) {
    return this.service.getPageById(pageId)
  }

  @ResolveField(() => String, { nullable: true })
  previewUrl(@Parent() page: Page) {
    return ['/p/', page.id, '/preview/'].join('')
  }

  @ResolveField(() => String, { nullable: true })
  siteUrl(@Parent() page: Page) {
    return this.service.siteUrl()
  }

  @ResolveField(() => String, { nullable: true })
  viewUrl(@Parent() page: Page) {
    if (!page.domains?.length || !page.domains[0].domain) {
      return null
    }
    const { domain, path } = page.domains[0]
    return Domain.url(domain, path)
  }
}
