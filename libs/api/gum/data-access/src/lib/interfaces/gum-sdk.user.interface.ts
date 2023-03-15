import { gum_0_1_0_decoded_user } from '../../generated'

export function convertGumSdkUser(input: gum_0_1_0_decoded_user): GumSdkUser {
  return {
    authority: input.authority,
    owner: input.cl_owner,
    pubkey: input.cl_pubkey,
    executable: input.cl_executable,
    lamports: input.cl_lamports,
    updated_on: input.cl_updated_on,
    write_version: input.cl_write_version,
    // bf: input.cl_bf,
    // decoded_updated_on: input.cl_decoded_updated_on,
    // randomhash: input.randomhash,
    // rent_epoch: input.cl_rent_epoch,
    // txn_signature: input.cl_txn_signature,
  }
}

export interface GumSdkUser {
  authority?: string
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
  randomhash?: number[]
}
