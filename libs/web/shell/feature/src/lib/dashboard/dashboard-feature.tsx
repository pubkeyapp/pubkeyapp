import { Box, Button, Container, Group, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UiLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { useUserGetProfilesQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserIdentitiesProvider } from '../settings/user-identities.provider'
import { UserManageIdentities } from '../settings/user-manage.identities'
import { UserDashboardProfileCard } from './user-dashboard-profile.card'
import { UserManageProfiles } from './user-manage.profiles'

export function DashboardFeature() {
  const { user } = useAuth()
  const [{ data: profiles, fetching }] = useUserGetProfilesQuery()

  return (
    <Stack py={32} spacing={64}>
      {user ? <UserDashboardProfileCard user={user as any} /> : null}
      <Box>
        <Container size="sm">
          <UiTabRoutes
            tabs={[
              {
                label: 'Manage Profiles',
                value: 'profile',
                component: (
                  <Stack mt={64}>
                    {fetching ? <UiLoader /> : <UserManageProfiles profiles={profiles?.items ?? []} />}
                  </Stack>
                ),
              },
              {
                label: 'Manage Identities',
                value: 'identities',
                component: (
                  <Stack mt={64}>
                    <UserIdentitiesProvider>
                      <UserManageIdentities />
                    </UserIdentitiesProvider>
                  </Stack>
                ),
              },
            ]}
          />
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
