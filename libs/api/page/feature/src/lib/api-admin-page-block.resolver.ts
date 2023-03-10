import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminAddPageBlockInput,
  AdminUpdatePageBlockInput,
  ApiAdminPageBlockService,
  PageBlock,
} from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminPageBlockResolver {
  constructor(private readonly service: ApiAdminPageBlockService) {}

  @Mutation(() => PageBlock, { nullable: true })
  adminAddPageBlock(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('input') input: AdminAddPageBlockInput,
  ) {
    return this.service.adminAddPageBlock(user.id, pageId, input)
  }

  @Mutation(() => PageBlock, { nullable: true })
  adminRemovePageBlock(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('pageBlockId') pageBlockId: string,
  ) {
    return this.service.adminRemovePageBlock(user.id, pageId, pageBlockId)
  }

  @Mutation(() => PageBlock, { nullable: true })
  adminUpdatePageBlock(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('pageBlockId') pageBlockId: string,
    @Args('input') input: AdminUpdatePageBlockInput,
  ) {
    return this.service.adminUpdatePageBlock(user.id, pageId, pageBlockId, input)
  }
}
