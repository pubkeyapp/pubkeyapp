import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { ApiUserDomainService, Domain } from '@pubkeyapp/api/domain/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserDomainResolver {
  constructor(private readonly service: ApiUserDomainService) {}

  @Query(() => [Domain], { nullable: true })
  userGetDomains(@CtxUser() user: User) {
    return this.service.userGetDomains(user.id)
  }
}
