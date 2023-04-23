import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { clusterApiUrl } from '@solana/web3.js'
import { AdminCreateClusterInput } from './dto/admin-create-cluster.input'
import { AdminGetClustersInput } from './dto/admin-get-clusters.input'
import { AdminUpdateClusterInput } from './dto/admin-update-cluster.input'
import { ClusterType } from './entity/cluster-type.enum'

const solanaDevnetEndpoint = process.env.SOLANA_DEVNET_ENDPOINT || clusterApiUrl('devnet')
const solanaMainnetEndpoint = process.env.SOLANA_MAINNET_ENDPOINT || clusterApiUrl('mainnet-beta')
const solanaTestnetEndpoint = process.env.SOLANA_TESTNET_ENDPOINT || clusterApiUrl('testnet')

@Injectable()
export class ApiAdminClusterService implements OnModuleInit {
  private readonly default: Prisma.ClusterCreateInput[] = [
    {
      id: 'solana-devnet',
      type: ClusterType.SolanaDevnet,
      name: 'Solana Devnet',
      endpointPrivate: solanaDevnetEndpoint,
      endpointPublic: solanaDevnetEndpoint,
      explorer: 'https://solscan.fm/{path}?cluster=devnet-solana',
    },
    {
      id: 'solana-mainnet',
      type: ClusterType.SolanaMainnet,
      name: 'Solana Mainnet',
      endpointPrivate: solanaMainnetEndpoint,
      endpointPublic: solanaMainnetEndpoint,
      explorer: 'https://solscan.fm/{path}',
    },
    {
      id: 'solana-testnet',
      type: ClusterType.SolanaTestnet,
      name: 'Solana Testnet',
      endpointPrivate: solanaTestnetEndpoint,
      endpointPublic: solanaTestnetEndpoint,
      explorer: 'https://solscan.fm/{path}?cluster=testnet-solana',
    },
  ]
  private readonly logger = new Logger(ApiAdminClusterService.name)
  constructor(private readonly core: ApiCoreService) {}

  async onModuleInit() {
    for (const clusterCreateInput of this.default) {
      // Create the cluster if that id does not exist
      const found = await this.core.data.cluster.findUnique({ where: { id: clusterCreateInput.id } })
      if (!found) {
        const created = await this.core.data.cluster.create({ data: clusterCreateInput })
        this.logger.log(`Created cluster ${created.id} => ${created.endpointPrivate}`)
      }
    }
  }

  async adminCreateCluster(adminId: string, input: AdminCreateClusterInput) {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.cluster.create({
      data: {
        endpointPrivate: input.endpoint,
        endpointPublic: input.endpoint,
        explorer: 'https://solana.fm/${path}',
        name: input.name,
        type: input.type,
      },
    })
  }

  async adminGetClusters(adminId: string, input: AdminGetClustersInput) {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.cluster.findMany({
      where: Object.keys(input).length
        ? {
            OR: [{ type: input.type }, { name: { contains: input.name } }],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    })
  }

  async adminGetCluster(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)

    const cluster = await this.core.data.cluster.findUnique({
      where: {
        id,
      },
    })

    if (!cluster) {
      throw new NotFoundException()
    }

    return cluster
  }

  async adminDeleteCluster(adminId: string, clusterId: string) {
    await this.core.ensureUserAdmin(adminId)

    try {
      await this.core.data.cluster.delete({ where: { id: clusterId } })
      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  async adminUpdateCluster(adminId: string, clusterId: string, input: AdminUpdateClusterInput) {
    await this.core.ensureUserAdmin(adminId)

    try {
      return this.core.data.cluster.update({
        where: { id: clusterId },
        data: { ...input },
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
