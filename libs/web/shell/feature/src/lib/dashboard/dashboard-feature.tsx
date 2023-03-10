import { Box, Button, Container, Group, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UiLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { useUserGetProfilesQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserManageIdentities } from '../settings/user-manage.identities'
import { UserManageProfiles } from './user-manage.profiles'

export function DashboardFeature() {
  const { user } = useAuth()
  const [{ data: profiles, fetching }] = useUserGetProfilesQuery()

  return (
    <Box py={32}>
      <Container size="sm">
        <UiTabRoutes
          tabs={[
            {
              label: 'Manage Profiles',
              value: 'profile',
              component: (
                <Stack spacing={64} mt={64}>
                  {fetching ? <UiLoader /> : <UserManageProfiles profiles={profiles?.items ?? []} />}
                </Stack>
              ),
            },
            {
              label: 'Manage Identities',
              value: 'identities',
              component: (
                <Stack spacing={64} mt={64}>
                  <UserManageIdentities identities={user?.identities ?? []} />
                </Stack>
              ),
            },
          ]}
        />
      </Container>
      <Group mt={64} position="center">
        <Button size="xs" variant="subtle" component={Link} to="/early">
          You're early.
        </Button>
      </Group>
    </Box>
  )
}
