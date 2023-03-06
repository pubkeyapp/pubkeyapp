import { gum_0_1_0_decoded_user } from '@pubkeyapp/gum-sdk'

export function convertGumSdkUser(input: gum_0_1_0_decoded_user): GumSdkUser {
  return {
    authority: input.authority,
    bf: input.cl_bf,
    decoded_updated_on: input.cl_decoded_updated_on,
    executable: input.cl_executable,
    lamports: input.cl_lamports,
    owner: input.cl_owner,
    pubkey: input.cl_pubkey,
    rent_epoch: input.cl_rent_epoch,
    txn_signature: input.cl_txn_signature,
    updated_on: input.cl_updated_on,
    write_version: input.cl_write_version,
    randomhash: input.randomhash,
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
