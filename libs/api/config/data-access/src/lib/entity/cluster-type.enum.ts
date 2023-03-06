import { registerEnumType } from '@nestjs/graphql'
import { ClusterType } from '@pubkeyapp/solana'

export { ClusterType }
registerEnumType(ClusterType, { name: 'ClusterType' })
