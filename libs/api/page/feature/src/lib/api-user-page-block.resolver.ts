import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  UserAddPageBlockInput,
  UserUpdatePageBlockInput,
  ApiUserPageBlockService,
  PageBlock,
} from '@pubkeyapp/api/page/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserPageBlockResolver {
  constructor(private readonly service: ApiUserPageBlockService) {}

  @Mutation(() => PageBlock, { nullable: true })
  userAddPageBlock(@CtxUser() user: User, @Args('pageId') pageId: string, @Args('input') input: UserAddPageBlockInput) {
    return this.service.userAddPageBlock(user.id, pageId, input)
  }

  @Query(() => PageBlock, { nullable: true })
  userPageBlock(@CtxUser() user: User, @Args('pageBlockId') pageBlockId: string) {
    return this.service.userPageBlock(user.id, pageBlockId)
  }

  @Mutation(() => PageBlock, { nullable: true })
  userRemovePageBlock(@CtxUser() user: User, @Args('pageId') pageId: string, @Args('pageBlockId') pageBlockId: string) {
    return this.service.userRemovePageBlock(user.id, pageId, pageBlockId)
  }

  @Mutation(() => PageBlock, { nullable: true })
  userUpdatePageBlock(
    @CtxUser() user: User,
    @Args('pageId') pageId: string,
    @Args('pageBlockId') pageBlockId: string,
    @Args('input') input: UserUpdatePageBlockInput,
  ) {
    return this.service.userUpdatePageBlock(user.id, pageId, pageBlockId, input)
  }
}
