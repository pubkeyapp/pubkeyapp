import { SDK, useGum } from '@gumhq/react-sdk'
import { Namespace } from '@gumhq/sdk/lib/profile'
import { GumDecodedUser } from '@gumhq/sdk/lib/user'
import { showNotificationSuccess } from '@pubkeyapp/web/ui/core'
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
  createProfile: (namespace: Namespace, owner: string, userAccount: string) => Promise<boolean>
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

  async function createProfile(namespace: Namespace, owner: string, userAccount: string) {
    setLoading(true)
    const create = await sdk.profile.create(new PublicKey(userAccount), namespace, new PublicKey(owner))
    return create.instructionMethodBuilder.rpc().then((res) => {
      console.log('res', res)
      showNotificationSuccess(`Gum Profile ${namespace} created`)
      return true
    })
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
