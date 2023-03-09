import { createStyles, Group, SimpleGrid } from '@mantine/core'
import { IdentityBadge } from '@pubkeyapp/web/identity/ui'
import { Identity } from '@pubkeyapp/web/util/sdk'
import React from 'react'

export const useStyles = createStyles((theme) => ({
  shareItem: {
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },
  },
}))

export function DashboardIdentities({ identities }: { identities: Identity[] }) {
  return (
    <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {/*<UiDebug data={{ profiles }} open />*/}
      {identities.map((identity) => (
        <Group key={identity.id} position="center" p="lg">
          <IdentityBadge identity={identity} />
        </Group>
      ))}
    </SimpleGrid>
  )
}
