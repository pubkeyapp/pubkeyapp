import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserPageService, Page, UserCreatePageInput, UserUpdatePageInput } from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserPageResolver {
  constructor(private readonly service: ApiUserPageService) {}

  @Mutation(() => Page, { nullable: true })
  userCreatePage(@CtxUser() user: User, @Args('input') input: UserCreatePageInput) {
    return this.service.userCreatePage(user.id, input)
  }

  @Mutation(() => Page, { nullable: true })
  userDeletePage(@CtxUser() user: User, @Args('pageId') pageId: string) {
    return this.service.userDeletePage(user.id, pageId)
  }

  @Query(() => Page, { nullable: true })
  userGetPage(@CtxUser() user: User, @Args('pageId') pageId: string) {
    return this.service.userGetPage(user.id, pageId)
  }

  @Mutation(() => Page, { nullable: true })
  userUpdatePage(@CtxUser() user: User, @Args('pageId') pageId: string, @Args('input') input: UserUpdatePageInput) {
    return this.service.userUpdatePage(user.id, pageId, input)
  }
}
