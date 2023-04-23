import { UseGuards } from '@nestjs/common'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard } from '@pubkeyapp/api/auth/data-access'
import { Collection } from '@pubkeyapp/api/collection/data-access'

@Resolver(() => Collection)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiCollectionFieldResolver {
  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() collection: Collection) {
    const postfix = `?cluster=${collection?.cluster?.toLowerCase()}`

    return `/collection/${collection.address}${postfix}`
  }

  @ResolveField(() => Int, { nullable: true })
  mintCount(@Parent() collection: Collection) {
    return collection.mints?.length ?? 0
  }
}
