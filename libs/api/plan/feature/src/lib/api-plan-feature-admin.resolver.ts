import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { AdminListPlanInput, ApiPlanAdminService } from '@pubkeyapp/api/plan/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { AdminCreatePlanInput, AdminUpdatePlanInput, Plan } from '@pubkeyapp/api/plan/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiPlanFeatureAdminResolver {
  constructor(private readonly service: ApiPlanAdminService) {}

  @Mutation(() => Plan, { nullable: true })
  adminCreatePlan(@CtxUser() user: User, @Args('input') input: AdminCreatePlanInput) {
    return this.service.adminCreatePlan(user.id, input)
  }

  @Mutation(() => Plan, { nullable: true })
  adminDeletePlan(@CtxUser() user: User, @Args('planId') planId: string) {
    return this.service.adminDeletePlan(user.id, planId)
  }

  @Query(() => [Plan], { nullable: true })
  adminPlans(
    @CtxUser() user: User,
    @Args({
      name: 'input',
      type: () => AdminListPlanInput,
      nullable: true,
    })
    input: AdminListPlanInput,
  ) {
    return this.service.adminPlans(user.id, input)
  }

  @Query(() => Plan, { nullable: true })
  adminPlan(@CtxUser() user: User, @Args('planId') planId: string) {
    return this.service.adminPlan(user.id, planId)
  }

  @Mutation(() => Plan, { nullable: true })
  adminUpdatePlan(
    @CtxUser() user: User,
    @Args('planId') planId: string,
    @Args('input') input: AdminUpdatePlanInput,
  ) {
    return this.service.adminUpdatePlan(user.id, planId, input)
  }
}
