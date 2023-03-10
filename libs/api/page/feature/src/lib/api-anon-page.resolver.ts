import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiPublicPageService, Page } from '@pubkeyapp/api/page/data-access'

@Resolver()
export class ApiAnonPageResolver {
  constructor(private readonly service: ApiPublicPageService) {}

  @Query(() => Page, { nullable: true })
  anonGetPage(@Args('pageId') pageId: string) {
    return this.service.getPageById(pageId)
  }
}
