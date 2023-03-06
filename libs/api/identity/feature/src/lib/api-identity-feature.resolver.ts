import { ApiIdentityDataAccessService } from '@pubkeyapp/api/identity/data-access'
import { Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiIdentityFeatureResolver {
  constructor(private readonly service: ApiIdentityDataAccessService) {}
}
