import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { AdminCreateUserInput, AdminUpdateUserInput, ApiAdminUserService, User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminUserResolver {
  constructor(private readonly service: ApiAdminUserService) {}

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@CtxUser() user: User, @Args('input') input: AdminCreateUserInput) {
    return this.service.adminCreateUser(user.id, input)
  }

  @Mutation(() => User, { nullable: true })
  adminDeleteUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.adminDeleteUser(user.id, userId)
  }

  @Query(() => User, { nullable: true })
  adminGetUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.adminGetUser(user.id, userId)
  }

  @Query(() => [User], { nullable: true })
  adminGetUsers(@CtxUser() user: User) {
    return this.service.adminGetUsers(user.id)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@CtxUser() user: User, @Args('userId') userId: string, @Args('input') input: AdminUpdateUserInput) {
    return this.service.adminUpdateUser(user.id, userId, input)
  }
}
