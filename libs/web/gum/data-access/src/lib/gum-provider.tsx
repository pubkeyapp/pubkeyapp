import { SDK } from '@gumhq/react-sdk'
import { Namespace } from '@gumhq/sdk/lib/profile'
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react'
import { Cluster, ConfirmOptions, Connection, PublicKey } from '@solana/web3.js'

import { GraphQLClient } from 'graphql-request'
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react'

const DEVNET_GRAPHQL_ENDPOINT = 'https://light-pelican-32.hasura.app/v1/graphql'

const gqlClient = new GraphQLClient(DEVNET_GRAPHQL_ENDPOINT as string)

export interface GumProviderContext {
  loading: boolean
  owner: PublicKey
  users: any[] | undefined
  sdk: SDK
  createProfile: (namespace: Namespace, userAccount: PublicKey, metadataUri: string) => Promise<void>
  refresh: () => Promise<void>
}

const GumContext = createContext<GumProviderContext>({} as GumProviderContext)

export function GumProvider({ children, owner, sdk }: { children: ReactNode; owner: PublicKey; sdk: SDK }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<any[] | undefined>(undefined)

  async function createProfile(namespace: Namespace, userAccount: PublicKey, metadataUri: string) {
    console.log('creating profile')
    // setLoading(true)
    // const metadataUri = 'https://gist.githubusercontent.com/beeman/27f08d1d772a42e5f75f965faf8bb366/raw/profile.json'
    // const createProfile = await sdk.profile.create(userAccount, namespace, owner)
    // const profileMetadata = await sdk.profileMetadata.create(metadataUri, createProfile.profilePDA, userAccount, owner)
    // const profileMetadataIx = await profileMetadata.instructionMethodBuilder.instruction()

    // const data = {
    //   instructionMethodBuilder: createProfile.instructionMethodBuilder.postInstructions([profileMetadataIx]),
    //   profilePDA: createProfile.profilePDA,
    // }

    // return data.instructionMethodBuilder
    //   .rpc()
    //   .then(async () => {
    //     showNotificationSuccess('Profile Created')
    //     await refresh()
    //   })
    //   .catch((err) => {
    //     setLoading(false)
    //     console.log(`err`, err)
    //     showNotificationError('Profile Creation Failed')
    //   })
  }

  async function refresh(): Promise<void> {
    console.log('refreshing')
  }

  const value: GumProviderContext = {
    loading,
    owner,
    users,
    sdk,
    createProfile,
    refresh,
  }

  return <GumContext.Provider value={value}>{children}</GumContext.Provider>
}

export const gumProvider = () => useContext(GumContext)

// export const useGumSDK = (connection: Connection, opts: ConfirmOptions, cluster: Cluster) => {
//   const anchorWallet = useAnchorWallet() as AnchorWallet
//
//   return useMemo(() => {
//     return new SDK(anchorWallet, connection, opts, cluster, gqlClient)
//   }, [anchorWallet, connection, opts, cluster])
// }
