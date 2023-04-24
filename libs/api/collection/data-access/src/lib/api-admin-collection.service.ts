import { Metaplex, NftWithToken } from '@metaplex-foundation/js'
import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { ClusterType, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Connection, PublicKey } from '@solana/web3.js'
import axios from 'axios'
import * as process from 'process'
import slugify from 'slugify'
import { AdminCreateCollectionInput } from './dto/admin-create-collection.input'
import { AdminGetCollectionMintsInput, Trait, TraitFilter } from './dto/admin-get-collection-mints.input'
import { AdminGetCollectionsInput } from './dto/admin-get-collections.input'
import { AdminUpdateCollectionInput } from './dto/admin-update-collection.input'
import { Mint } from './entity/mint.entity'
import { ProcessMintIndexInput } from './queue/api-collection-queue.helper'
import { ApiCollectionQueueService } from './queue/api-collection-queue.service'

export class PubKeyHelius {
  constructor(private readonly apiKey: string) {}

  getConnection(cluster: ClusterType): Connection {
    switch (cluster) {
      case ClusterType.SolanaDevnet:
        return new Connection(`https://rpc-devnet.helius.xyz/?api-key=${this.apiKey}`)
      case ClusterType.SolanaMainnet:
        return new Connection(`https://rpc.helius.xyz/?api-key=${this.apiKey}`)
      default:
        throw new Error(`Cluster ${cluster} not supported`)
    }
  }

  getMetaplex(cluster: ClusterType) {
    return Metaplex.make(this.getConnection(cluster))
  }

  getUrl(cluster: ClusterType, path: string) {
    switch (cluster) {
      case ClusterType.SolanaMainnet:
        return `https://api.helius.xyz/${path}?api-key=${this.apiKey}`
      default:
        throw new Error(`Cluster ${cluster} not supported`)
    }
  }

  async getMintList(
    cluster: ClusterType,
    {
      limit = 10000,
      paginationToken,
      verifiedCollectionAddresses,
    }: {
      limit?: number
      paginationToken?: string
      verifiedCollectionAddresses: string[]
    },
  ) {
    const { data } = await axios.post(this.getUrl(cluster, 'v1/mintlist'), {
      query: { verifiedCollectionAddresses },
      options: {
        limit: 10000,
        paginationToken,
      },
    })
    return data
  }

  async getMintMetadata(cluster: ClusterType, mints: string[]) {
    const { data } = await axios.post(this.getUrl(cluster, 'v1/nfts'), {
      mints,
    })
    console.log(data)
    return data
  }
}

@Injectable()
export class ApiAdminCollectionService implements OnModuleInit {
  private readonly default: Prisma.CollectionCreateInput[] = [
    {
      address: 'SMBH3wF6baUj6JWtzYvqcKuj2XCKWDqQxzspY12xPND',
      cluster: ClusterType.SolanaMainnet,
      name: 'Solana Monkey Business',
      twitter: '@SolanaMBS',
    },
    {
      address: 'GoLMLLR6iSUrA6KsCrFh7f45Uq5EHFQ3p8RmzPoUH9mb',
      cluster: ClusterType.SolanaMainnet,
      name: 'Degenerate Trash Pandas',
      twitter: '@DegenTrashPanda',
    },
    {
      address: '6mszaj17KSfVqADrQj3o4W3zoLMTykgmV37W4QadCczK',
      cluster: ClusterType.SolanaMainnet,
      name: 'Claynosaurz',
      twitter: '@Claynosaurz',
    },
    {
      address: '3saAedkM9o5g1u5DCqsuMZuC4GRqPB4TuMkvSsSVvGQ3',
      cluster: ClusterType.SolanaMainnet,
      name: 'Okay Bears',
      twitter: '@OkayBears',
    },
    {
      address: 'BUjZjAS2vbbb65g7Z1Ca9ZRVYoJscURG5L3AkVvHP9ac',
      cluster: ClusterType.SolanaMainnet,
      name: 'Famous Fox Federation',
      twitter: '@FamousFoxFed',
    },
  ]

  private readonly logger = new Logger(ApiAdminCollectionService.name)
  private readonly helius = new PubKeyHelius(this.core.config.heliusApiKey)
  constructor(readonly core: ApiCoreService, private readonly queue: ApiCollectionQueueService) {}

  async onModuleInit() {
    for (const collection of this.default) {
      const found = await this.core.data.collection.findUnique({
        where: { address_cluster: { address: collection.address, cluster: collection.cluster } },
      })
      if (!found) {
        const created = await this.core.data.collection.create({
          data: { ...collection, id: slugify(collection.name).toLowerCase() },
        })
        this.logger.log(`Created collection ${created.id} => ${created.cluster}`)
      }
    }
  }

  normalizeMint(mint: Mint): Mint {
    const metadata = mint.metadata as Prisma.JsonObject
    const attributes = Array.isArray(metadata?.attributes) ? metadata?.attributes : [metadata?.attributes]
    return {
      ...mint,
      attributes: (attributes ?? [])?.reduce(
        (acc: Record<string, string>, curr: { trait_type: string; value: string }) => ({
          ...acc,
          [curr.trait_type]: curr.value,
        }),
        {},
      ),
      image: metadata?.image?.toString(),
      name: metadata?.name?.toString(),
      symbol: metadata?.symbol?.toString(),
    }
  }

  async adminCreateCollection(adminId: string, input: AdminCreateCollectionInput) {
    await this.core.ensureUserAdmin(adminId)

    // Make sure the collection does not exist
    const found = await this.core.data.collection.findUnique({
      where: {
        address_cluster: {
          address: input.address,
          cluster: input.cluster,
        },
      },
    })
    if (found) {
      throw new BadRequestException(`Collection ${input.name} already exists`)
    }

    let id = slugify(input.name)
    // Make sure the id is unique, else add cluster to the id
    let exists = await this.core.data.collection.findUnique({
      where: {
        id,
      },
    })
    if (exists) {
      id = `${id}-${input.cluster}`
    }
    return this.core.data.collection.create({
      data: {
        id: id.toLowerCase(),
        name: input.name,
        address: input.address,
        cluster: input.cluster,
      },
    })
  }

  async adminGetCollections(adminId: string, input: AdminGetCollectionsInput) {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.collection.findMany({
      where: Object.keys(input).length
        ? {
            OR: [
              { cluster: input.cluster },
              { name: { contains: input.name } },
              { address: { contains: input.address } },
            ],
          }
        : undefined,
      orderBy: { name: 'asc' },
      include: { mints: true },
    })
  }

  async adminGetCollection(adminId: string, id: string, { includeMints }: { includeMints?: boolean } = {}) {
    await this.core.ensureUserAdmin(adminId)

    const collection = await this.core.data.collection.findUnique({
      where: { id },
      include: includeMints ? { mints: true } : undefined,
    })

    if (!collection) {
      throw new NotFoundException()
    }

    return collection
  }

  async adminSyncCollection(adminId: string, collectionId: string) {
    const collection = await this.adminGetCollection(adminId, collectionId, { includeMints: true })
    const tag = `adminSyncCollection ${collection.id} ${collection.cluster}`

    const mints = await this.getCollectionMints(collection.cluster, collection.id, collection.address)
    const newMints = mints.filter((m) => !collection.mints.find((fm) => fm.address === m.mint))

    const items = await this.core.data.mint.createMany({
      data: newMints.map((m) => ({
        address: m.mint,
        cluster: collection.cluster,
        collectionId: collection.id,
        name: m.name,
      })),
    })
    this.logger.verbose(`${tag} ${items.count} mints added to collection`)

    return true
  }

  async adminSyncCollectionMeta(adminId: string, collectionId: string) {
    const collection = await this.adminGetCollection(adminId, collectionId, { includeMints: true })
    const tag = `adminSyncCollectionMeta ${collection.id} ${collection.cluster}`

    const mints = collection.mints.filter((m) => !m.metadata)

    this.logger.verbose(`${tag} ${mints.length} mints missing metadata`)

    await this.queue.processCollectionMintsMeta({ mints })
    return true
  }

  async getCollectionMints(cluster: ClusterType, collectionId: string, address: string | string[]) {
    const mints = Array.isArray(address) ? address : [address]
    const tag = `getCollectionMints: ${mints.join(', ')}`

    this.logger.verbose(`${tag} start`)

    const count = await this.core.data.mint.count({ where: { collectionId: collectionId } })

    let paginationToken = count ? `V1_${count}` : undefined

    do {
      const data = await this.helius.getMintList(cluster, {
        paginationToken,
        verifiedCollectionAddresses: mints,
      })
      this.logger.verbose(`${tag} page: ${data.result.length} items paginationToken: ${paginationToken}`)
      await this.queue.processCollectionMintsIndex({ mintList: data.result, cluster, collectionId })
      paginationToken = data.paginationToken
      // Sleep for 10 seconds
      console.log('sleeping')
      await new Promise((resolve) => setTimeout(resolve, 10000))
    } while (paginationToken)

    this.logger.verbose(`${tag} done at page: ${paginationToken}`)
    return []
  }

  async adminDeleteCollection(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)

    try {
      const deleteMints = await this.core.data.mint.deleteMany({ where: { collectionId } })
      this.logger.verbose(`adminDeleteCollection ${collectionId} deleted ${deleteMints.count} mints`)
      const deleteCollection = await this.core.data.collection.delete({ where: { id: collectionId } })
      this.logger.verbose(`adminDeleteCollection ${collectionId} deleted ${deleteCollection.name} collection`)
      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  async adminUpdateCollection(adminId: string, collectionId: string, input: AdminUpdateCollectionInput) {
    await this.core.ensureUserAdmin(adminId)

    try {
      return this.core.data.collection.update({
        where: { id: collectionId },
        data: { name: input.name, address: input.address },
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async adminGetCollectionMints(adminId: string, collectionId: string, input: AdminGetCollectionMintsInput) {
    const collection = await this.adminGetCollection(adminId, collectionId)

    const where: Prisma.MintWhereInput = {
      collectionId: collection.id,
    }

    if (input.search) {
      where.OR = [{ name: { contains: input.search, mode: 'insensitive' } }, { address: { contains: input.search } }]
    }

    const traits: TraitFilter[] = input.traits ?? []

    if (traits?.length) {
      where.AND = [
        ...traits.map((t) => ({
          attributes: { path: [t.key], equals: t.value },
        })),
      ]
    }

    return this.core.data.mint.findMany({
      where,
      orderBy: [{ metadata: 'asc' }, { name: 'asc' }],
      skip: input.skip ?? 0,
      take: input.take ?? 100,
    })
  }

  async handleProcessMintMeta(mint: Mint) {
    const metaplex = await this.helius.getMetaplex(mint.cluster)

    const metadata = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey(mint.address),
      loadJsonMetadata: true,
    })

    if (metadata?.json) {
      mint = this.normalizeMint({ ...mint, metadata: JSON.parse(JSON.stringify(metadata.json)) })
      const updated = await this.core.data.mint.update({
        where: { id: mint.id },
        data: {
          metadata: JSON.parse(JSON.stringify(metadata.json)),
          attributes: mint.attributes as Record<string, string>,
          name: mint.name,
          image: mint.image,
          symbol: mint.symbol,
        },
      })
      this.logger.verbose(
        ` updated ${updated.id} --> ${mint.address}: ${metadata?.json?.name} ${metadata?.json?.image} `,
      )
    }
  }

  async handleProcessMintNormalize({ mint }: { mint: Mint }) {
    if (!mint.metadata) {
      // this.logger.verbose(`skipping ${mint.id} --> ${mint.address}: no metadata`)
      return mint
    }
    mint = this.normalizeMint(mint)
    const updated = await this.core.data.mint.update({
      where: { id: mint.id },
      data: {
        attributes: mint.attributes as Record<string, string>,
        name: mint.name,
        image: mint.image,
        symbol: mint.symbol,
      },
    })
    // this.logger.verbose(
    //   `Updated ${updated.id} --> ${mint.address}: ${mint.name} ${mint.image} ${JSON.stringify(mint.attributes)} `,
    // )
    return updated
  }

  async handleProcessMintIndex(mint: ProcessMintIndexInput) {
    const exists = await this.core.data.mint.findUnique({
      where: {
        address_cluster: {
          address: mint.mint,
          cluster: mint.cluster,
        },
      },
    })
    if (exists) {
      return
    }
    const created = await this.core.data.mint.create({
      data: {
        address: mint.mint,
        cluster: mint.cluster,
        collectionId: mint.collectionId,
        name: mint.name,
      },
    })
    await this.handleProcessMintMeta(created)
  }

  mintCount(collectionId: string) {
    return this.core.cache.wrap<number>(
      'collection',
      `mint-count-${collectionId}`,
      () => this.core.data.mint.count({ where: { collectionId: collectionId } }),
      1000 * 60,
    )
  }

  private async normalizeMints() {
    const mints = await this.core.data.mint.count({
      where: {
        attributes: { equals: undefined },
      },
    })

    this.logger.verbose(`There are ${mints} mints to normalize`)

    const batch = 10000
    const pages = Math.ceil(mints / batch)
    for (let i = 0; i < pages; i++) {
      const items = await this.core.data.mint.findMany({
        where: {
          attributes: { equals: undefined },
          metadata: { not: { equals: undefined } },
        },
        take: batch,
        skip: i * batch,
      })

      await this.queue.processCollectionMintsNormalize({ mints: items })

      this.logger.verbose(`Processing ${items.length} mints ${i + 1}/${pages}`)
    }
  }

  async adminGetCollectionTraits(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    const collection = await this.core.data.collection.findUnique({
      where: { id: collectionId },
      include: { mints: true },
    })

    const mints = ((collection.mints as Mint[]) ?? []).filter((m) => m.attributes)
    const empty = ((collection.mints as Mint[]) ?? []).filter((m) => !m.attributes)

    if (empty?.length) {
      this.logger.warn(`Collection ${collection.name} has ${empty.length} mints without attributes`)
      empty.forEach((mint) => {
        this.logger.warn(` --> ${mint.name}`)
      })
      await this.queue.processCollectionMintsMeta({ mints: empty })
    }

    this.logger.verbose(`Collection ${collection.name} has ${mints.length} mints`)

    const attributes: Trait[] = []

    mints.forEach((mint) => {
      Object.entries(mint.attributes).forEach(([key, value]) => {
        const exists = attributes.find((a) => a.key === key && a.value === value)
        if (exists) {
          exists.count++
        } else {
          attributes.push({ key, value, count: 1 })
        }
      })
    })

    this.logger.verbose(`Collection ${collection.name} has ${Object.keys(attributes).length} attributes`)

    return attributes
  }
}
