import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkeyapp/api/auth/data-access'
import {
  AdminCreateCollectionInput,
  AdminGetCollectionMintsInput,
  AdminGetCollectionsInput,
  AdminUpdateCollectionInput,
  ApiAdminCollectionService,
  Collection,
  Mint,
  Trait,
  TraitFilter,
} from '@pubkeyapp/api/collection/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

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

  @Mutation(() => Boolean, { nullable: true })
  adminSyncCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.adminSyncCollection(user.id, collectionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminSyncCollectionMeta(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.adminSyncCollectionMeta(user.id, collectionId)
  }

  @Query(() => Collection, { nullable: true })
  adminGetCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.adminGetCollection(user.id, collectionId, { includeMints: true })
  }

  @Query(() => [Trait], { nullable: true })
  adminGetCollectionTraits(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.adminGetCollectionTraits(user.id, collectionId)
  }

  @Query(() => [Mint], { nullable: true })
  adminGetCollectionMints(
    @CtxUser() user: User,
    @Args('collectionId') collectionId: string,
    @Args('input') input: AdminGetCollectionMintsInput,
  ) {
    return this.service.adminGetCollectionMints(user.id, collectionId, input)
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
