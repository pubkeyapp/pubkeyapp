import { Box, Button, Container, Group, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'

import { DashboardGumUserCreate } from '@pubkeyapp/web/dashboard/ui'
import { RequestAirdrop } from '@pubkeyapp/web/dev/ui'
import { UserIdentitiesProvider, UserManageIdentities } from '@pubkeyapp/web/identity/ui'
import { UserProfilesProvider } from '@pubkeyapp/web/profile/data-access'
import { SearchBox } from '@pubkeyapp/web/search/ui'
import { UserUsernameModal } from '@pubkeyapp/web/user/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserManageProfiles } from './user-manage.profiles'

export function DashboardFeature() {
  const { user } = useAuth()

  return (
    <Stack py={32} spacing={64}>
      <Group position="center">
        <SearchBox />
      </Group>
      <Box>
        <Container size="sm">
          <Stack spacing={64}>
            <Group position="center">{user ? <UserUsernameModal user={user} /> : null}</Group>
            {user?.gumUser ? null : (
              <Stack>
                <RequestAirdrop />
                <DashboardGumUserCreate />
              </Stack>
            )}
            <UserProfilesProvider>
              <UserManageProfiles />
            </UserProfilesProvider>
            <UserIdentitiesProvider>
              <UserManageIdentities />
            </UserIdentitiesProvider>
          </Stack>
        </Container>
      </Box>
      <Group mt={64} position="center">
        <Button size="xs" variant="subtle" component={Link} to="/early">
          You're early.
        </Button>
      </Group>
    </Stack>
  )
}
