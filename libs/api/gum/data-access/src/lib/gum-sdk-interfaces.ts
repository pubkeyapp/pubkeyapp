export interface GumSdkPost {
  bf?: boolean
  decoded_updated_on?: bigint
  executable?: boolean
  lamports?: bigint
  owner?: string
  pubkey: string
  rent_epoch?: bigint
  slot?: bigint
  txn_signature?: string
  updated_on?: number
  write_version?: bigint
  metadata?: unknown
  metadatauri?: string
  profile?: string
  randomhash?: number[]
  replyto?: string
}
