import { Anchor, Badge, Box, Group, List, Paper, Skeleton, Stack, Title } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { GumPostInput } from '@pubkeyapp/web/gum/ui'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { UiActionIcon, UiDebug, UiError, UiLoader } from '@pubkeyapp/web/ui/core'
import { NetworkType, useUserGetAccountQuery } from '@pubkeyapp/web/util/sdk'
import { PublicKey } from '@solana/web3.js'
import { IconRefresh } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function WebGumUserDetails({ address, network }: { address: string; network: NetworkType }) {
  const { user } = useAuth()
  const [{ data, error: getAccountError, fetching }] = useUserGetAccountQuery({ variables: { address, network } })
  const { sdk } = useGumApp()

  const [loading, setLoading] = useState<boolean>(false)
  const [profiles, setProfiles] = useState<any[]>([])
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

  function loadProfiles(address: string) {
    setLoading(true)
    sdk.user
      .get(new PublicKey(address))
      .then((res) => sdk.profile.getProfilesByUser(res?.authority))
      .then((res) => {
        console.log('res', res)
        setProfiles(res)
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
    loadProfiles(data.item.address)
  }, [data?.item?.address])

  if (fetching) {
    return <UiLoader />
  }
  if (error ?? getAccountError) {
    return <UiError error={error ?? getAccountError?.message} />
  }

  if (!data?.item && !data?.item?.address) {
    return <UiError error={'No data found'} />
  }

  return (
    <Stack align="center" justify="space-between" h="100%" w="100%" py={32}>
      <Box w="100%">
        <Paper>
          <Stack spacing={32}>
            <Group position="apart">
              <Badge size="xl" color="pink">
                User
              </Badge>
              <Group spacing={8}>
                {/*<CreateGumProfileModal post={defaultProfile} />*/}
                <UiActionIcon
                  size="xl"
                  iconSize={24}
                  loading={loading}
                  label={'Refresh Profiles'}
                  icon={IconRefresh}
                  onClick={() => loadProfiles(data.item!.address!)}
                />
              </Group>
            </Group>
            <UiDebug data={{ profiles }} open />
            <Skeleton radius="xl" visible={loading}>
              <Title size="lg">Gum Profiles</Title>
              <List listStyleType="none">
                {profiles.sort().map((profile) => (
                  <List.Item key={profile.cl_pubkey.toString()}>
                    <Anchor color="brand" component={Link} to={`/apps/gum/${network}/${profile.cl_pubkey}/profile`}>
                      {profile.cl_pubkey.toString()}
                    </Anchor>
                  </List.Item>
                ))}
              </List>
            </Skeleton>
          </Stack>
        </Paper>
      </Box>
      <UiDebug data={{ data: data?.item, error, fetching }} />
    </Stack>
  )
}
