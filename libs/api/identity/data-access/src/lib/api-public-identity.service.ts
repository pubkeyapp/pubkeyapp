import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { IdentityProvider } from './entity/identity-provider.enum'

@Injectable()
export class ApiPublicIdentityService {
  constructor(readonly core: ApiCoreService) {}

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
