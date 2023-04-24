import { UseGuards } from '@nestjs/common'
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard } from '@pubkeyapp/api/auth/data-access'
import { ApiAdminCollectionService, Collection } from '@pubkeyapp/api/collection/data-access'

@Resolver(() => Collection)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiCollectionFieldResolver {
  constructor(private readonly service: ApiAdminCollectionService) {}

  @ResolveField(() => String, { nullable: true })
  explorerUrl(@Parent() collection: Collection) {
    const postfix = `?cluster=${collection?.cluster?.toLowerCase()}`

    return `/collection/${collection.address}${postfix}`
  }

  @ResolveField(() => Int, { nullable: true })
  mintCount(@Parent() collection: Collection) {
    return this.service.core.data.mint.count({ where: { collectionId: collection.id } })
    // return this.service.mintCount(collection.id)
  }
}
