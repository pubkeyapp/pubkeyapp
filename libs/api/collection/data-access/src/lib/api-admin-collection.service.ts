import { Metaplex, NftWithToken } from '@metaplex-foundation/js'
import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { ClusterType, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Connection, PublicKey } from '@solana/web3.js'
import axios from 'axios'
import slugify from 'slugify'
import { AdminCreateCollectionInput } from './dto/admin-create-collection.input'
import { AdminGetCollectionMintsInput } from './dto/admin-get-collection-mints.input'
import { AdminGetCollectionsInput } from './dto/admin-get-collections.input'
import { AdminUpdateCollectionInput } from './dto/admin-update-collection.input'

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
  constructor(private readonly core: ApiCoreService) {}

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

    const mints = await this.getCollectionMints(collection.cluster, collection.address)
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

    // Find mints that are missing metadata
    const mints = collection.mints.filter((m) => !m.metadata)

    this.logger.verbose(`${tag} ${mints.length} mints missing metadata`)

    const metaplex = await this.helius.getMetaplex(collection.cluster)

    const results: NftWithToken[] = []

    for (const mint of mints) {
      this.logger.verbose(`${tag} ${mint.address} ${mint.name}`)
      const nft = await metaplex.nfts().findByMint({
        mintAddress: new PublicKey(mint.address),
        loadJsonMetadata: true,
      })

      if (nft) {
        const updated = await this.core.data.mint.update({
          where: { id: mint.id },
          data: { metadata: JSON.parse(JSON.stringify(nft.json)) },
        })
        this.logger.verbose(` updated ${updated.id} --> ${mint.address}: ${nft?.json?.name} ${nft?.json?.image} `)
      }
    }

    console.log(results)
    //
    // const metadata = await this.helius.getMintMetadata(
    //   collection.cluster,
    //   mints.map((m) => m.address),
    // )
    //
    // console.log(metadata)

    // // Loop over each 1000 items
    // for (let i = 0; i < mints.length; i += 10_000) {
    //   const items = mints.slice(i, i + 10_000)
    //   const addresses = items.map((m) => m.address)
    //
    //   // Get metadata for each mint
    //   this.logger.verbose(`${tag} ${metadata.length} metadata items`)
    //
    //   // Update each mint with metadata
    //   for (const mint of metadata) {
    //     const item = items.find((i) => i.address === mint.mint)
    //     if (item) {
    //       await this.core.data.mint.update({
    //         where: { address_cluster: { address: item.address, cluster: item.cluster } },
    //         data: { metadata: mint },
    //       })
    //     }
    //   }
    // }

    return true
  }

  async getCollectionMints(cluster: ClusterType, address: string | string[]) {
    const mints = Array.isArray(address) ? address : [address]
    const tag = `getCollectionMints: ${mints.join(', ')}`

    this.logger.verbose(`${tag} start`)

    const result = []

    let paginationToken = undefined
    do {
      const data = await this.helius.getMintList(cluster, {
        paginationToken,
        verifiedCollectionAddresses: mints,
      })
      this.logger.verbose(`${tag} page: ${data.result.length} items`)
      result.push(...data.result)
      paginationToken = data.paginationToken
    } while (paginationToken)

    this.logger.verbose(`${tag} done: ${result.length} items`)
    return result
  }

  async adminDeleteCollection(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)

    try {
      await this.core.data.collection.delete({ where: { id: collectionId } })
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
    return this.core.data.mint.findMany({
      where: input.search
        ? {
            collectionId: collection.id,
            OR: [
              // { cluster: input.cluster },
              { name: { contains: input.search, mode: 'insensitive' } },
              // { address: { contains: input.address } },
            ],
          }
        : {
            collectionId: collection.id,
          },
      orderBy: { name: 'asc' },
      skip: input.skip ?? 0,
      take: input.take ?? 100,
    })
  }
}
