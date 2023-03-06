import { Query, Resolver } from '@nestjs/graphql'
import { ApiConfigDataAccessService, Config } from '@pubkeyapp/api/config/data-access'

@Resolver()
export class ApiConfigFeatureResolver {
  constructor(private readonly service: ApiConfigDataAccessService) {}

  @Query(() => Config, { nullable: true })
  config() {
    return this.service.getConfig()
  }
}
