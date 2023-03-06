import { Container, Grid, SimpleGrid, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { useUserPagesQuery, useUserProfilesQuery, useUserQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { DashboardConnectIdentities } from './dashboard-connect.identities'

export function DashboardFeature() {
  const { user } = useAuth()
  const [{ data: userData }] = useUserQuery({ variables: { username: `${user?.username}` } })
  const [{ data: profiles }] = useUserProfilesQuery({ variables: { username: `${user?.username}` } })
  const [{ data: pages }] = useUserPagesQuery({ variables: { username: `${user?.username}` } })

  return (
    <Container my="md">
      <Stack>
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <UiDebug data={{ userData, pages }} />
          <Grid gutter="md">
            <Grid.Col>
              <DashboardConnectIdentities identities={userData?.item?.identities ?? []} />
            </Grid.Col>
            <Grid.Col>
              <UiDebug data={{ userData, profiles }} />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
