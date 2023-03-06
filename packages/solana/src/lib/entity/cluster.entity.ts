import { ClusterType } from './cluster-type.enum'

export interface Cluster {
  id: string
  name: string
  type: ClusterType
  endpoint: string
  explorerUrl: string
}
