import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminCreateCollectionInput,
  AdminGetCollectionsInput,
  ApiAdminCollectionService,
  Collection,
} from '@pubkeyapp/api/collection/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { AdminUpdateCollectionInput } from '../../../data-access/src/lib/dto/admin-update-collection.input'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminCollectionResolver {
  constructor(private readonly service: ApiAdminCollectionService) {}

  @Mutation(() => Collection, { nullable: true })
  adminCreateCollection(@CtxUser() user: User, @Args('input') input: AdminCreateCollectionInput) {
    return this.service.adminCreateCollection(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.adminDeleteCollection(user.id, collectionId)
  }

  @Query(() => Collection, { nullable: true })
  adminGetCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.adminGetCollection(user.id, collectionId)
  }

  @Query(() => [Collection], { nullable: true })
  adminGetCollections(@CtxUser() user: User, @Args('input') input: AdminGetCollectionsInput) {
    return this.service.adminGetCollections(user.id, input)
  }

  @Mutation(() => Collection, { nullable: true })
  adminUpdateCollection(
    @CtxUser() user: User,
    @Args('collectionId') collectionId: string,
    @Args('input') input: AdminUpdateCollectionInput,
  ) {
    return this.service.adminUpdateCollection(user.id, collectionId, input)
  }
}
