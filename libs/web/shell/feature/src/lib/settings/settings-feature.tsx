import { ActionIcon, Container, Stack, Text } from '@mantine/core'
import { UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import { IconSettings } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { SettingsUserIdentitiesTab } from './settings-user-identities-tab'
import { SettingsUserProfileTab } from './settings-user-profile-tab'

export function SettingsFeature() {
  return (
    <Container size="md">
      <Stack>
        <UiPageHeader
          title={
            <Text component={Link} to="/settings" size="xl" weight={500}>
              Settings
            </Text>
          }
          leftAction={
            <ActionIcon component={Link} to="/settings">
              <IconSettings height={32} />
            </ActionIcon>
          }
        />
        <UiTabRoutes
          tabs={[
            {
              label: 'Your Profile',
              value: 'profile',
              component: <SettingsUserProfileTab />,
            },
            {
              label: 'Your Identities',
              value: 'identities',
              component: <SettingsUserIdentitiesTab />,
            },
          ]}
        />
      </Stack>
    </Container>
  )
}
