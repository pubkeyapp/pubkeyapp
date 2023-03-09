import { SDK } from '@gumhq/sdk'
import { Connection, PublicKey } from '@solana/web3.js'
import { fetch } from 'cross-fetch'
import { createClient } from '../generated'
import { convertGumSdkProfileMetadata, GumSdkProfileMetadata } from './interfaces/gum-sdk-profile-meta.interface'
import { convertGumSdkProfile, GumSdkProfile } from './interfaces/gum-sdk-profile.interface'
import { convertGumSdkUser, GumSdkUser } from './interfaces/gum-sdk.user.interface'

import { GraphQLClient } from 'graphql-request'
interface GumSdkConfig {
  endpoint: string
}

export class GumSdk {
  private readonly client
  readonly sdk: SDK
  constructor(private readonly config: GumSdkConfig) {
    const graphqlClient = new GraphQLClient(process.env.GUM_ENDPOINT as string)
    const connection = new Connection(process.env.SOLANA_DEVNET_ENDPOINT as string, 'confirmed')
    this.sdk = new SDK({} as any, connection, { commitment: 'confirmed' }, 'devnet', graphqlClient)
    this.client = createClient({ url: config.endpoint, fetch: fetch })
  }

  async getGumProfile(owner: string) {
    const ownerPk = new PublicKey(owner)
    const user = await this.sdk.user.getUser(ownerPk)
    const userPublicKey = user.cl_pubkey.toString()

    const profiles = await this.sdk.profile.getProfilesByUser(ownerPk)
    const filteredProfiles = profiles.filter((p) => p.username.toString() === userPublicKey)
    const filteredProfilePks = filteredProfiles.map((p) => p.cl_pubkey.toString())

    const profileMeta = await this.sdk.profileMetadata.getProfileMetadataByUser(ownerPk)
    const filteredMeta = profileMeta.filter((p) => filteredProfilePks.includes(p.profile))

    return {
      user,
      profiles: filteredProfiles,
      meta: filteredMeta,
    }
  }

  async getProfilesForPks(publicKeys: string[]): Promise<GumSdkProfile[]> {
    return this.client
      .query({
        gum_0_1_0_decoded_profile: {
          __args: {
            where: {
              username: {
                _in: publicKeys,
              },
            },
          },
          cl_bf: true,
          cl_decoded_updated_on: true,
          cl_executable: true,
          cl_lamports: true,
          cl_owner: true,
          cl_pubkey: true,
          cl_rent_epoch: true,
          cl_slot: true,
          username: true,
          cl_txn_signature: true,
          cl_updated_on: true,
          cl_write_version: true,
          namespace: true,
          __typename: true,
        },
      })
      .then((res) => res.gum_0_1_0_decoded_profile.map((item) => convertGumSdkProfile(item)))
  }

  async getProfileMetasForPks(publicKeys: string[]): Promise<GumSdkProfileMetadata[]> {
    return this.client
      .query({
        gum_0_1_0_decoded_profilemetadata: {
          __args: {
            where: {
              profile: {
                _in: publicKeys,
              },
            },
          },
          cl_bf: true,
          cl_decoded_updated_on: true,
          cl_executable: true,
          cl_lamports: true,
          cl_owner: true,
          cl_pubkey: true,
          cl_rent_epoch: true,
          cl_slot: true,
          cl_txn_signature: true,
          cl_updated_on: true,
          cl_write_version: true,
          __typename: true,
          profile: true,
          metadata: true,
          metadatauri: true,
        },
      })
      .then((res) => res.gum_0_1_0_decoded_profilemetadata.map((item) => convertGumSdkProfileMetadata(item)))
  }

  async getUsersForPk(publicKey: string): Promise<GumSdkUser[]> {
    return this.client
      .query({
        gum_0_1_0_decoded_user: {
          __args: {
            where: {
              authority: {
                _eq: publicKey,
              },
            },
          },
          authority: true,
          cl_bf: true,
          cl_decoded_updated_on: true,
          cl_executable: true,
          cl_lamports: true,
          cl_owner: true,
          cl_pubkey: true,
          cl_rent_epoch: true,
          cl_slot: true,
          cl_txn_signature: true,
          cl_updated_on: true,
          cl_write_version: true,
          randomhash: true,
          __typename: true,
        },
      })
      .then((res) => res.gum_0_1_0_decoded_user.map((item) => convertGumSdkUser(item)))
  }

  async getAll(): Promise<{ gum_0_1_0_decoded_all: any[] }> {
    return this.client.query({
      gum_0_1_0_decoded_all: {
        __args: {
          // order_by: {
          //   account_type: 'asc',
          // },
          // where: {
          //   account_type: {
          //     _eq: 'profile',
          //   },
          // },
        },
        owner: true,
        pubkey: true,
        account_type: true,
        // account_raw_data: true,
        account_decoded_data: true,
        slot: true,
      },
    })
  }
}
