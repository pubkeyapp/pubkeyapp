import { Alert, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core'
import { Identity, IdentityProvider, User } from '@pubkeyapp/web/util/sdk'
import TimeAgo from 'timeago-react'
import { IdentityProviderAvatar, IdentityProviderLink, VerifiedBadge } from '@pubkeyapp/web/identity/ui'

export function UserIdentityItem({ identity, user }: { identity: Identity; user: User }) {
  return (
    <Paper>
      <Group>
        {identity.provider ? <IdentityProviderAvatar provider={identity.provider} /> : null}
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Group position="apart">
            <Group align="center">
              <Text>{identity.provider} Account</Text>
              <Text size="xs" color="dimmed">
                <TimeAgo datetime={`${identity.createdAt}`} />
              </Text>
            </Group>
            {identity.verified ? <VerifiedBadge /> : null}
          </Group>
          <Text size="xs" color="dimmed">
            <IdentityProviderLink providerId={identity.providerId} provider={identity.provider as IdentityProvider} />
          </Text>
        </Stack>
      </Group>
    </Paper>
  )
}

export function AdminUserIdentitiesTab({ user }: { user: User }) {
  const theme = useMantineTheme()

  return (
    <Stack>
      <Stack>
        {user?.identities?.length ? (
          user?.identities.map((identity) => <UserIdentityItem key={identity.id} user={user} identity={identity} />)
        ) : (
          <Alert>User has no linked identities</Alert>
        )}
      </Stack>
      <Paper component="pre" withBorder radius="md" p={theme.spacing.md} fz={'xs'}>
        {JSON.stringify({ user }, null, 2)}
      </Paper>
    </Stack>
  )
}
