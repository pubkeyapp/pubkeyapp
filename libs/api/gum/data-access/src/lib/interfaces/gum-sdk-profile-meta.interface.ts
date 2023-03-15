import { GumSdkProfile } from './gum-sdk-profile.interface'
import { gum_0_1_0_decoded_profilemetadata } from '../../generated'

export function convertGumSdkProfileMetadata(input: gum_0_1_0_decoded_profilemetadata): GumSdkProfileMetadata {
  return {
    // bf: input.cl_bf,
    // decoded_updated_on: input.cl_decoded_updated_on,
    executable: input.cl_executable,
    lamports: input.cl_lamports,
    owner: input.cl_owner,
    pubkey: input.cl_pubkey,
    // rent_epoch: input.cl_rent_epoch,
    // slot: input.cl_slot,
    // txn_signature: input.cl_txn_signature,
    updated_on: input.cl_updated_on,
    write_version: input.cl_write_version,
    metadata: input.metadata,
    metadatauri: input.metadatauri,
    profileId: input.profile,
  }
}

export interface GumSdkProfileMetadata {
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
  metadata?: any
  metadatauri?: string
  profileId?: string
  profile?: GumSdkProfile
}
