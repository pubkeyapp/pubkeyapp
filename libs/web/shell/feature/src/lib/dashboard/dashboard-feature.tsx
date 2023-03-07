import { Anchor, Container, Paper, SimpleGrid, Stack, Text } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { PageList } from '@pubkeyapp/web/page/ui'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { useUserPagesQuery, useUserProfilesQuery, useUserQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { DashboardConnectIdentities } from './dashboard-connect.identities'

export function DashboardFeature() {
  const { user } = useAuth()
  const [{ data: userData }] = useUserQuery({ variables: { username: `${user?.username}` } })
  const [{ data: profiles }] = useUserProfilesQuery({ variables: { username: `${user?.username}` } })
  const [{ data: pages }] = useUserPagesQuery()

  return (
    <Container size="xl">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Paper>
          <Stack>
            <Text size="xl" fw={500}>
              Your pages
            </Text>
            <PageList pages={pages?.items ?? []} />
            <Anchor size="xl" component={Link} to="/pages">
              Manage Pages
            </Anchor>
          </Stack>
        </Paper>
        <Paper>
          <Stack>
            <Text size="xl" fw={500}>
              Your identities
            </Text>
            <DashboardConnectIdentities identities={userData?.item?.identities ?? []} />
          </Stack>
        </Paper>
        <UiDebug data={{ userData, profiles }} />
      </SimpleGrid>
    </Container>
  )
}
