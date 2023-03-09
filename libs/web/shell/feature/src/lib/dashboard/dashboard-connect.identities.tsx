import { Button, createStyles, Group, Stack } from '@mantine/core'
import { IdentityBadge } from '@pubkeyapp/web/identity/ui'
import { Identity } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export const useStyles = createStyles((theme) => ({
  shareItem: {
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },
  },
}))

export function DashboardConnectIdentities({ identities }: { identities: Identity[] }) {
  return (
    <Stack>
      <Stack>
        {identities.map((identity) => (
          <Group key={identity.id}>
            <IdentityBadge identity={identity} />
          </Group>
        ))}
        <Group>
          <Button size="xs" variant="subtle" component={Link} to="/settings/identities">
            Manage Identities
          </Button>
        </Group>
      </Stack>
    </Stack>
  )
}
