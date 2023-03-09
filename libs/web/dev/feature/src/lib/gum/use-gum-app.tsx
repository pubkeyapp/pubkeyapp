import { SDK } from '@gumhq/react-sdk'
import { useMantineTheme } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react'
import { Cluster, ConfirmOptions, Connection, PublicKey } from '@solana/web3.js'
import { IconBuildingBank, IconDeviceGamepad, IconPigMoney, IconQuestionMark, IconUser } from '@tabler/icons-react'
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { formatOwnerData, gumGetOwnerData } from './gum-helpers'
import { GumOwnerData, GumUser, Namespace } from './gum-interfaces'

import { GraphQLClient } from 'graphql-request'

const DEVNET_GRAPHQL_ENDPOINT = 'https://aware-earwig-49.hasura.app/v1/graphql'

const gqlClient = new GraphQLClient(DEVNET_GRAPHQL_ENDPOINT as string)

export interface GumAppProviderContext {
  loading: boolean
  owner: PublicKey
  users: GumUser[] | undefined
  sdk: SDK
  createPost: (profileAccount: PublicKey, userAccount: PublicKey, metadataUri: string) => Promise<void>
  deleteProfile: (profileAccount: PublicKey, userAccount: PublicKey) => Promise<void>
  deletePost: (postAccount: PublicKey, profileAccount: PublicKey, userAccount: PublicKey) => Promise<void>
  deleteUser: (userAccount: PublicKey) => Promise<void>
  createProfile: (namespace: Namespace, userAccount: PublicKey, metadataUri: string) => Promise<void>
  refresh: () => Promise<void>
}

const GumAppContext = createContext<GumAppProviderContext>({} as GumAppProviderContext)

export function GumAppProvider({ children, owner, sdk }: { children: ReactNode; owner: PublicKey; sdk: SDK }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [account, setAccount] = useState<GumOwnerData | undefined>(undefined)
  const [users, setUsers] = useState<GumUser[] | undefined>(undefined)

  useEffect(() => {
    // Run once on mount
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!account?.usersList?.length) return
    const structured = formatOwnerData(account)
    setUsers(structured)
  }, [account])

  function deleteProfile(profileAccount: PublicKey, userAccount: PublicKey) {
    setLoading(true)
    return sdk.profile
      .delete(profileAccount, userAccount, owner)
      .rpc()
      .then(async () => {
        showNotificationSuccess('Profile Deleted')
        await refresh()
      })
      .catch((err) => {
        console.log(`err`, err)
        setLoading(false)
        showNotificationError('Profile Deletion Failed')
      })
  }
  function deleteUser(userAccount: PublicKey) {
    setLoading(true)
    return sdk.user
      .delete(userAccount, owner)
      .rpc()
      .then(async () => {
        showNotificationSuccess('User Deleted')
        await refresh()
      })
      .catch((err) => {
        setLoading(false)
        console.log(`err`, err)
        showNotificationError('User Deletion Failed')
      })
  }
  function deletePost(postAccount: PublicKey, profileAccount: PublicKey, userAccount: PublicKey) {
    setLoading(true)
    return sdk.post
      .delete(postAccount, profileAccount, userAccount, owner)
      .rpc()
      .then(async () => {
        showNotificationSuccess('Post Deleted')
        await refresh()
      })
      .catch((err) => {
        setLoading(false)
        console.log(`err`, err)
        showNotificationError('Post Deletion Failed')
      })
  }
  async function createProfile(namespace: Namespace, userAccount: PublicKey, metadataUri: string) {
    setLoading(true)
    // const metadataUri = 'https://gist.githubusercontent.com/beeman/27f08d1d772a42e5f75f965faf8bb366/raw/profile.json'
    const createProfile = await sdk.profile.create(userAccount, namespace, owner)
    const profileMetadata = await sdk.profileMetadata.create(metadataUri, createProfile.profilePDA, userAccount, owner)
    const profileMetadataIx = await profileMetadata.instructionMethodBuilder.instruction()

    const data = {
      instructionMethodBuilder: createProfile.instructionMethodBuilder.postInstructions([profileMetadataIx]),
      profilePDA: createProfile.profilePDA,
    }

    return data.instructionMethodBuilder
      .rpc()
      .then(async () => {
        showNotificationSuccess('Profile Created')
        await refresh()
      })
      .catch((err) => {
        setLoading(false)
        console.log(`err`, err)
        showNotificationError('Profile Creation Failed')
      })
  }

  async function createPost(profileAccount: PublicKey, userAccount: PublicKey, metadataUri: string) {
    setLoading(true)
    return sdk.post.create(metadataUri, profileAccount, userAccount, owner).then((rpc) => {
      rpc.instructionMethodBuilder.rpc().then(async (res) => {
        setLoading(false)
        return res
      })
    })
  }

  async function refresh(): Promise<void> {
    setLoading(true)
    try {
      const user = await sdk.user.getUser(owner)
      console.log('user', user)
    } catch (e) {
      console.log('e', e)
    }

    try {
      const getUserAccountsByAuthority = await sdk.user.getUserAccountsByAuthority(owner)
      console.log('getUserAccountsByAuthority', getUserAccountsByAuthority)
    } catch (e) {
      console.log('e', e)
    }

    try {
      const profilesByUser = await sdk.profile.getProfilesByUser(owner)
      console.log('profilesByUser', profilesByUser)
    } catch (e) {
      console.log('e', e)
    }

    const account = await gumGetOwnerData(owner, sdk)
    console.log('account', account, sdk)
    setLoading(false)
    setAccount(account)
  }

  const value: GumAppProviderContext = {
    loading,
    owner,
    users,
    sdk,
    createPost,
    createProfile,
    deleteProfile,
    deleteUser,
    deletePost,
    refresh,
  }

  return <GumAppContext.Provider value={value}>{children}</GumAppContext.Provider>
}

export const useGumApp = () => useContext(GumAppContext)

export const useGumSDK = (connection: Connection, opts: ConfirmOptions, cluster: Cluster) => {
  const anchorWallet = useAnchorWallet() as AnchorWallet

  return useMemo(() => {
    return new SDK(anchorWallet, connection, opts, cluster, gqlClient)
  }, [anchorWallet, connection, opts, cluster])
}

export function GumProfileTypeColor({ type }: { type: Namespace | string }): string {
  switch (type.toLowerCase()) {
    case 'professional':
      return 'blue'
    case 'personal':
      return 'green'
    case 'gaming':
      return 'yellow'
    case 'degen':
      return 'red'
    default:
      return 'gray'
  }
}
export function GumProfileTypeIcon({
  size = 16,
  type,
  color,
}: {
  size?: number
  type: Namespace | string
  color?: string
}) {
  const theme = useMantineTheme()
  color = color ?? theme.colors[GumProfileTypeColor({ type })][6]
  switch (type.toLowerCase()) {
    case 'professional':
      return <IconBuildingBank size={size} color={color} />
    case 'personal':
      return <IconUser size={size} color={color} />
    case 'gaming':
      return <IconDeviceGamepad size={size} color={color} />
    case 'degen':
      return <IconPigMoney size={size} color={color} />
    default:
      return <IconQuestionMark size={size} color={color} />
  }
}
