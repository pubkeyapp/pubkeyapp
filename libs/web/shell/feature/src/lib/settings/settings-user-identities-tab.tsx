import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Button,
  Container,
  createStyles,
  Group,
  Paper,
  rem,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import {
  IdentityProviderAvatar,
  IdentityProviderBadge,
  IdentityProviderLink,
  VerifiedBadge,
} from '@pubkeyapp/web/identity/ui'
import { showNotificationError, showNotificationSuccess, UiDebugModal } from '@pubkeyapp/web/ui/core'
import { Identity, IdentityProvider, useUserDeleteIdentityMutation } from '@pubkeyapp/web/util/sdk'
import { IconBrandDiscord, IconTrash } from '@tabler/icons-react'
import React from 'react'

export function SettingsUserIdentitiesTab() {
  const { user, refresh } = useAuth()
  const [, deleteIdentityMutation] = useUserDeleteIdentityMutation()
  const deleteIdentity = (id: string) => {
    const found = user?.identities?.find((identity) => identity.id === id)
    if (!found || !window.confirm(`Are you sure you want to delete ${found.provider} identity ${found.providerId}?`)) {
      return
    }
    deleteIdentityMutation({ identityId: found.id + '' })
      .then((res) => {
        refresh()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Profile updated')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }
  return (
    <Container size="md">
      <Stack>
        <Stack>
          {user?.identities?.length ? (
            user?.identities.map((identity) => (
              <UserIdentityItem key={identity.id} deleteIdentity={deleteIdentity} identity={identity} />
            ))
          ) : (
            <Alert>User has no linked identities</Alert>
          )}
        </Stack>
        <Group mt={36} position="center">
          <Button component="a" href="/api/auth/discord" leftIcon={<IconBrandDiscord size={36} />}>
            Link Discord Identity
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}))

export function UserIdentityItem({
  identity,
  deleteIdentity,
}: {
  identity: Identity
  deleteIdentity: (id: string) => void
}) {
  const { classes } = useStyles()
  const { user } = useAuth()
  return (
    <Paper className={classes.comment}>
      <Group>
        {identity.provider ? <IdentityProviderAvatar provider={identity.provider} /> : null}
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Group position="apart">
            <Stack spacing={4}>
              <Group align="center">
                <IdentityProviderBadge identity={identity} />
              </Group>
              <Group align="center">
                <Text size="xs" color="dimmed">
                  <IdentityProviderLink
                    providerId={identity.providerId}
                    provider={identity.provider as IdentityProvider}
                  />
                </Text>
                <UiDebugModal data={identity} />
              </Group>
            </Stack>
            <Stack spacing={8} align="end">
              {identity.verified ? <VerifiedBadge /> : <Badge color="yellow">Not verified</Badge>}
              {identity.providerId !== user?.publicKey ? (
                <Tooltip label="Delete Identity">
                  <ActionIcon color="red" onClick={() => deleteIdentity(identity.id!)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Tooltip>
              ) : (
                <Tooltip label="You can't delete your default identity">
                  <Badge color="gray">Default Identity</Badge>
                </Tooltip>
              )}
            </Stack>
          </Group>
        </Stack>
      </Group>
    </Paper>
  )
}
