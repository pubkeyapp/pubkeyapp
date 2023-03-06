import { Float, Query, Resolver } from '@nestjs/graphql'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'

@Resolver()
export class ApiCoreFeatureResolver {
  constructor(private readonly service: ApiCoreService) {}

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }
}
