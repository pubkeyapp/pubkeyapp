import { Badge, Box, Group, List, Paper, Skeleton, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { CreateGumPostModal, GumPostGrid, GumPostInput } from '@pubkeyapp/web/gum/ui'
import { ProfileCard } from '@pubkeyapp/web/profile/ui'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { UiActionIcon, UiDebug, UiError, UiLoader, UiUserLink } from '@pubkeyapp/web/ui/core'
import { NetworkType, useUserGetAccountQuery } from '@pubkeyapp/web/util/sdk'
import { PublicKey } from '@solana/web3.js'
import { IconRefresh } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'

export function WebGumProfileDetails({ address, network }: { address: string; network: NetworkType }) {
  const { user } = useAuth()
  const [{ data, error: getAccountError, fetching }] = useUserGetAccountQuery({ variables: { address, network } })
  const { sdk } = useGumApp()

  const [loading, setLoading] = useState<boolean>(false)
  const [posts, setPosts] = useState<any[]>([])
  const [error, setError] = useState<any>(null)
  const [deleteError, setDeleteError] = useState<any>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const defaultPost: GumPostInput = {
    metadataUri: 'https://arweave.net/38QPWQKahx7nBI-b3A4dEwINBplYpJf7sP1YPULriHQ',
    owner: user?.publicKey ?? undefined,
    userAccount: user?.gumUser?.address ?? undefined,
    profileAccount: data?.item?.address ?? undefined,
  }

  const deletePost = async (cl_pubkey: string): Promise<boolean> => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return false
    }
    setDeleteLoading(true)
    return sdk.post
      .delete(
        new PublicKey(cl_pubkey),
        new PublicKey(defaultPost.profileAccount!),
        new PublicKey(defaultPost.userAccount!),
        new PublicKey(defaultPost.owner!),
      )
      .rpc()
      .then((res) => {
        console.log('delete tx -> ', res)
        return !!res
      })
      .catch((err) => {
        console.log('delete err', err)
        setDeleteError(err)
        return false
      })
      .finally(() => setDeleteLoading(false))
  }

  function loadPosts(address: string) {
    setLoading(true)

    sdk.post.getPostAccountsByUser(new PublicKey(address)).then((res) => {
      console.log('getPostAccountsByUser', res)
    })

    sdk.post
      .getPostsByProfile(new PublicKey(address))
      .then((res) => {
        console.log('res', res)
        setPosts(res)
      })
      .catch((err) => {
        console.log('err', err)
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!data?.item?.address) return
    loadPosts(data.item.address)
  }, [data?.item?.address])

  if (fetching) {
    return <UiLoader />
  }
  if (error ?? getAccountError) {
    return <UiError error={error ?? getAccountError?.message} />
  }
  // List all the posts, connections, etc. from this GumProfile
  // - Quick and dirty, whatever gets it done
  // Work on
  //  - v creating,
  //  - updating,
  //  - deleting (kinda...)
  // Work on Profile follows/unfollows
  // Work on Post Comments, Replies
  // Work on Arweave posting. (Maybe a separate feature?)

  if (!data?.item?.address) {
    return <UiError error={'No data found'} />
  }

  return (
    <Stack align="center" justify="space-between" h="100%" w="100%" py={32}>
      <Box w="100%">
        <Stack spacing={32}>
          {data.item.gumProfile ? (
            <Paper>
              <Stack spacing={32}>
                <ProfileCard profile={data.item.gumProfile} />
                {data?.item?.gumProfile?.owner?.gumUser ? (
                  <Group position="center">
                    <Badge color="pink">Gum User</Badge>
                    <UiUserLink
                      user={data?.item?.gumProfile?.owner}
                      to={`/apps/gum/${network}/${data?.item?.gumProfile?.owner?.gumUser.address}/user`}
                    />
                  </Group>
                ) : null}
              </Stack>
            </Paper>
          ) : null}
          <Paper>
            <Group position="apart">
              <Badge size="xl" color="brand">
                Posts
              </Badge>
              <Group spacing={8}>
                <CreateGumPostModal post={defaultPost} />
                <UiActionIcon
                  size="xl"
                  iconSize={24}
                  loading={loading}
                  label={'Refresh Posts'}
                  icon={IconRefresh}
                  onClick={() => loadPosts(data.item!.address!)}
                />
              </Group>
            </Group>
            <Skeleton radius="xl" visible={loading}>
              <List listStyleType="none">
                <GumPostGrid posts={posts} loading={deleteLoading} deletePost={deletePost} />
              </List>
            </Skeleton>
          </Paper>
        </Stack>
      </Box>
      <UiDebug data={{ data: data?.item, error, fetching }} />
    </Stack>
  )
}
