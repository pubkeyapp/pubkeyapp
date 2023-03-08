import { Anchor, Box, Container, Flex, Paper, SimpleGrid, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { PageCreateButtons, PageList } from '@pubkeyapp/web/page/ui'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { useUserPagesQuery, useUserQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { EarlyFeatureActions } from '../early/early-feature'
import { DashboardConnectIdentities } from './dashboard-connect.identities'

export function DashboardFeature() {
  const { user } = useAuth()
  const [{ data: userData }] = useUserQuery({ variables: { username: `${user?.username}` } })
  const [{ data: pages, fetching }] = useUserPagesQuery({ variables: { username: `${user?.username}` } })

  return (
    <Container size="xl">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Paper>
          <Flex direction="column" justify="space-between" sx={{ height: '100%' }}>
            <Stack mb={32}>
              <Anchor size="xl" component={Link} to="/profiles" fw={500}>
                Your Profiles
              </Anchor>
              {fetching ? <UiLoader /> : <PageList pages={pages?.items ?? []} />}
            </Stack>
            <PageCreateButtons pages={pages?.items ?? []} />
          </Flex>
        </Paper>
        <Paper>
          <Stack>
            <Anchor size="xl" component={Link} to="/settings/identities" fw={500}>
              Your identities
            </Anchor>
            <DashboardConnectIdentities identities={userData?.item?.identities ?? []} />
          </Stack>
        </Paper>
        {/*<UiDebug data={{ userData, profiles }} />*/}
      </SimpleGrid>
      <Box mt={36}>
        <EarlyFeatureActions />
      </Box>
    </Container>
  )
}
