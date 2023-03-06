import { Query, Resolver } from '@nestjs/graphql'
import { ApiPlanService, Plan } from '@pubkeyapp/api/plan/data-access'

@Resolver(() => Plan)
export class ApiPlanFeatureResolver {
  constructor(private readonly service: ApiPlanService) {}

  @Query(() => [Plan], { nullable: true })
  publicPlans() {
    return this.service.publicPlans()
  }
}
