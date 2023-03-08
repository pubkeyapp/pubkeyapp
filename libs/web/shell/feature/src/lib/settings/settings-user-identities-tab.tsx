import { Alert, Badge, Container, createStyles, Group, Paper, Stack, Text } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { SolanaLogo } from '@pubkeyapp/web/ui/core'
import { Identity, IdentityProvider, User } from '@pubkeyapp/web/util/sdk'
import { IconBrandDiscord, IconCheck, IconQuestionCircle } from '@tabler/icons-react'
import TimeAgo from 'timeago-react'

export function SettingsUserIdentitiesTab() {
  const { user } = useAuth()
  return (
    <Container size="md">
      <Stack>
        <Stack>
          {user?.identities?.length ? (
            user?.identities.map((identity) => <UserIdentityItem key={identity.id} user={user} identity={identity} />)
          ) : (
            <Alert>User has no linked identities</Alert>
          )}
        </Stack>
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

interface CommentHtmlProps {
  identity: Identity
  user: User
}

export function UserIdentityItem({ identity, user }: CommentHtmlProps) {
  const { classes } = useStyles()

  return (
    <Paper className={classes.comment}>
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

export function IdentityProviderLink({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
  switch (
    provider
    // case IdentityProvider.Solana:
    //   return <LinkAccount address={providerId} />
  ) {
  }
  return <div>{providerId}</div>
}

export function VerifiedBadge() {
  const icon = (
    <Text display="flex">
      <IconCheck size={16} />
    </Text>
  )
  return <Badge leftSection={icon}>Verified</Badge>
}

export function IdentityProviderAvatar({ provider }: { provider: IdentityProvider }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord height={48} width={48} />
    case IdentityProvider.Solana:
      return <SolanaLogo />
  }
  return <IconQuestionCircle />
}
