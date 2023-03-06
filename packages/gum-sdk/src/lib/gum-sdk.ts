import { fetch } from 'cross-fetch'
import { createClient } from '../generated'
import { convertGumSdkProfileMetadata, GumSdkProfileMetadata } from './interfaces/gum-sdk-profile-meta.interface'
import { convertGumSdkProfile, GumSdkProfile } from './interfaces/gum-sdk-profile.interface'
import { convertGumSdkUser, GumSdkUser } from './interfaces/gum-sdk.user.interface'

interface GumSdkConfig {
  endpoint: string
}

export class GumSdk {
  private readonly client
  constructor(private readonly config: GumSdkConfig) {
    this.client = createClient({ url: config.endpoint, fetch: fetch })
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

  async getAll() {
    return this.client.query({
      gum_0_1_0_decoded_all: {
        __args: {
          where: {
            account_type: {
              _eq: 'profile',
            },
          },
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
