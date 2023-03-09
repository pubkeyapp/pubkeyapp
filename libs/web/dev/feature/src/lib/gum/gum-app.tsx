import { SDK } from '@gumhq/react-sdk'
import { Anchor, Button, Group, Paper, Stack, Title } from '@mantine/core'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGumApp } from './use-gum-app'

async function getGumProfile(sdk: SDK, owner: PublicKey) {
  const user = await sdk.user.getUser(owner)
  const userPublicKey = user.cl_pubkey.toString()

  const profiles = await sdk.profile.getProfilesByUser(owner)
  const filteredProfiles = profiles.filter((p) => p.username.toString() === userPublicKey)
  const filteredProfilePks = filteredProfiles.map((p) => p.cl_pubkey.toString())

  const profileMeta = await sdk.profileMetadata.getProfileMetadataByUser(owner)
  const filteredMeta = profileMeta.filter((p) => filteredProfilePks.includes(p.profile))

  return {
    user,
    profiles: filteredProfiles,
    meta: filteredMeta,
  }
}

export function GumApp() {
  const { sdk, owner } = useGumApp()
  const [user, setUser] = useState<any | undefined>()

  const [userPks, setUserPks] = useState<string[]>([])
  const loadUsers = async () => {
    try {
      const gumProfile = await getGumProfile(sdk, owner)
      setUser(gumProfile)
    } catch (e) {
      console.log('e', e)
    }
  }
  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <Stack spacing={42}>
      <Paper>
        <Group position="apart">
          <Title order={2}>Users</Title>
          <Group>
            <Button size="sm" onClick={loadUsers}>
              Load Users
            </Button>
          </Group>
        </Group>
      </Paper>
      {user?.user?.cl_pubkey ? (
        <Anchor component={Link} to={`/account/${user?.user?.cl_pubkey}?cluster=${sdk.cluster}`} ff="monospace">
          Profile: {user?.user?.cl_pubkey}
        </Anchor>
      ) : null}

      {user?.profiles?.length ? (
        <Paper>
          {user?.profiles?.map(({ cl_pubkey: pk }: { cl_pubkey: string }) => {
            return (
              <div key={pk}>
                <Anchor component={Link} to={`/account/${pk}?cluster=${sdk.cluster}`} ff="monospace">
                  Profile: {pk}
                </Anchor>
              </div>
            )
          })}
        </Paper>
      ) : null}
      {user?.meta?.length ? (
        <Paper>
          {user?.meta?.map(({ cl_pubkey: pk }: { cl_pubkey: string }) => {
            return (
              <div key={pk}>
                <Anchor component={Link} to={`/account/${pk}?cluster=${sdk.cluster}`} ff="monospace">
                  Profile Meta: {pk}
                </Anchor>
              </div>
            )
          })}
        </Paper>
      ) : null}
      <UiDebug data={user} open />
    </Stack>
  )
}
