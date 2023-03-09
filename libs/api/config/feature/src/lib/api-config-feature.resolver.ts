import { Query, Resolver } from '@nestjs/graphql'
import { ApiConfigService, Config } from '@pubkeyapp/api/config/data-access'

@Resolver()
export class ApiConfigFeatureResolver {
  constructor(private readonly service: ApiConfigService) {}

  @Query(() => Config, { nullable: true })
  config() {
    return this.service.getConfig()
  }
}
