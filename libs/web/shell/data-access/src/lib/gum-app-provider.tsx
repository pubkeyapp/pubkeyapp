import { SDK, useCreateUser, useGum } from '@gumhq/react-sdk'
import { Namespace } from '@gumhq/sdk/lib/profile'
import { GumDecodedUser } from '@gumhq/sdk/lib/user'
import { AnchorWallet, useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

import { GraphQLClient } from 'graphql-request'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const DEVNET_GRAPHQL_ENDPOINT = 'https://light-pelican-32.hasura.app/v1/graphql'

const gqlClient = new GraphQLClient(DEVNET_GRAPHQL_ENDPOINT as string)

export interface GumProviderContext {
  loading: boolean
  error: any
  sdk: SDK
  createProfile: (namespace: Namespace, userAccount: PublicKey, metadataUri: string) => Promise<void>
  refresh: () => Promise<void>
  user?: GumDecodedUser | undefined
}

const GumContext = createContext<GumProviderContext>({} as GumProviderContext)

export function GumAppProvider({ children }: { children: ReactNode }) {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const anchorWallet = useAnchorWallet() as AnchorWallet
  const sdk = useGum(anchorWallet, connection, { preflightCommitment: 'confirmed' }, 'devnet', gqlClient)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(undefined)
  const [user, setUser] = useState<GumDecodedUser | undefined>(undefined)

  const refresh = async () => {
    if (!publicKey) return
    setLoading(true)
    setError(undefined)
    console.log(`GumAppProvider: refresh => ${publicKey}`)
    sdk.user
      .getUser(new PublicKey(publicKey))
      .then((res) => {
        if (!res) {
          setUser(undefined)
          console.log(`GumAppProvider: getUser => ${publicKey} not found`)
          return
        }
        console.log(`GumAppProvider: getUser => ${res.authority.toString()} => ${res.cl_pubkey.toString()}`)
        setUser(res)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refresh()
  }, [connection.rpcEndpoint, publicKey])

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

  const value: GumProviderContext = {
    sdk,
    createProfile,
    refresh,
    user,
    loading,
    error,
  }

  return <GumContext.Provider value={value}>{children}</GumContext.Provider>
}

export const useGumApp = () => useContext(GumContext)
