import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { IdentityProvider } from './entity/identity-provider.enum'

@Injectable()
export class ApiIdentityDataAccessService {
  constructor(private readonly core: ApiCoreService) {}

  getUserByIdentity(provider: IdentityProvider, providerId: string) {
    return this.core.data.identity.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
      include: {
        owner: true,
      },
    })
  }
}
