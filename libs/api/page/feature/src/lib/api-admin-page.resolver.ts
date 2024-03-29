import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminCreatePageInput,
  AdminGetPagesInput,
  AdminUpdatePageInput,
  ApiAdminPageService,
  Page,
} from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminPageResolver {
  constructor(private readonly service: ApiAdminPageService) {}

  @Mutation(() => Page, { nullable: true })
  adminCreatePage(@CtxUser() user: User, @Args('input') input: AdminCreatePageInput) {
    return this.service.adminCreatePage(user.id, input)
  }

  @Mutation(() => Page, { nullable: true })
  adminDeletePage(@CtxUser() user: User, @Args('pageId') pageId: string) {
    return this.service.adminDeletePage(user.id, pageId)
  }

  @Query(() => [Page], { nullable: true })
  adminGetPages(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminGetPagesInput,
      nullable: true,
    })
    input: AdminGetPagesInput,
  ) {
    return this.service.adminGetPagesInput(user.id, input)
  }

  @Query(() => Page, { nullable: true })
  adminGetPage(@CtxUser() user: User, @Args('pageId') pageId: string) {
    return this.service.adminGetPage(user.id, pageId)
  }

  @Mutation(() => Page, { nullable: true })
  adminUpdatePage(@CtxUser() user: User, @Args('pageId') pageId: string, @Args('input') input: AdminUpdatePageInput) {
    return this.service.adminUpdatePage(user.id, pageId, input)
  }
}
