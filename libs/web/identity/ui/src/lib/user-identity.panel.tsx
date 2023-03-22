import { Box, Flex, Paper, Stack } from '@mantine/core'
import { UiActionIcon } from '@pubkeyapp/web/ui/core'
import { Identity, IdentityProvider } from '@pubkeyapp/web/util/sdk'
import { IconSettings } from '@tabler/icons-react'
import React, { useState } from 'react'
import { IdentityProviderLink } from './identity-provider-link'
import { UserIdentityPageSolana } from './user-identity-page.solana'
import { UserIdentitySettingsDelete } from './user-identity-settings.delete'
import { UserIdentitySettingsSync } from './user-identity-settings.sync'

export function UserIdentityPanel({ identity }: { identity: Identity }) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <Stack spacing={16}>
      <Flex justify="space-between">
        <Flex sx={{ flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }} px="md">
            <IdentityProviderLink
              providerId={identity.providerId}
              provider={identity.provider as IdentityProvider}
              username={identity.profile?.username}
            />
          </Box>
        </Flex>
        <UiActionIcon
          label={showSettings ? 'Hide Settings' : 'Show Settings'}
          onClick={() => setShowSettings(!showSettings)}
          icon={IconSettings}
        />
      </Flex>
      <Stack spacing={36}>
        {showSettings ? (
          <Paper>
            <Stack spacing={36}>
              <UserIdentitySettingsSync identity={identity} />
              <UserIdentitySettingsDelete identity={identity} />
            </Stack>
          </Paper>
        ) : null}
        <UserIdentityProviderPageContent identity={identity} />
      </Stack>
    </Stack>
  )
}

export function UserIdentityProviderPageContent({ identity }: { identity: Identity }) {
  switch (identity.provider) {
    case IdentityProvider.Solana:
      return <UserIdentityPageSolana identity={identity} />
    default:
      return null
  }
}
