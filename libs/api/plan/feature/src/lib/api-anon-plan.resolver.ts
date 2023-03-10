import { Query, Resolver } from '@nestjs/graphql'
import { ApiAnonPlanService, Plan } from '@pubkeyapp/api/plan/data-access'

@Resolver()
export class ApiAnonPlanResolver {
  constructor(private readonly service: ApiAnonPlanService) {}

  @Query(() => [Plan], { nullable: true })
  anonGetPlans() {
    return this.service.anonGetPlans()
  }
}
