import { Button, Code, Container, createStyles, Group, Paper, rem, Stack, Text, Title, Tooltip } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { showNotificationError, showNotificationSuccess, UiDebug, UiUserLink } from '@pubkeyapp/web/ui/core'
import {
  useMeQuery,
  UserStatus,
  useUserAcceptInviteMutation,
  useUserInviteQuery,
  useUserInvitesQuery,
} from '@pubkeyapp/web/util/sdk'
import {
  IconBrandDiscord,
  IconBrandTwitter,
  IconSquareRoundedNumber1,
  IconSquareRoundedNumber2,
  IconSquareRoundedNumber3,
} from '@tabler/icons-react'
import React from 'react'
import { EarlyAcceptInviteForm, EarlyAcceptInviteFormInput } from './early-accept-invite-form'
import { EarlyInviteItem } from './early-invite.item'

export const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export function EarlyFeature() {
  const { user } = useAuth()
  const { classes, theme } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>gm</div>
      <Title className={classes.title}>You are early!</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        You are one of the first users to join PubKey.
      </Text>
      <Stack align="center" sx={{ marginBottom: `calc(${theme.spacing.xl} * 1.5)` }}>
        <Tooltip label="This is your PubKey ID" withArrow>
          <Code
            color={user?.status === UserStatus.Active ? 'green' : 'brand'}
            sx={{ fontSize: 24, borderRadius: 50 }}
            px="xl"
            py="lg"
          >
            pid#{user?.pid}
          </Code>
        </Tooltip>
      </Stack>
      <EarlyFeatureActions />
    </Container>
  )
}

export function EarlyFeatureActions() {
  const { user, refresh } = useAuth()
  const [, acceptInviteMutation] = useUserAcceptInviteMutation()
  const [{ data }, refreshInvite] = useUserInviteQuery()
  const text = [
    'gm @PubKeyApp... wen invite code?',
    `My %23PID is ${user?.pid} 🚀`,
    `Get yours at https://devnet.pubkey.app! 🅿️ #Grizzlython @Solana`,
  ].join('%0a%0a')

  const acceptInvite = async (input: EarlyAcceptInviteFormInput) => {
    if (!input.code) {
      return showNotificationError('Please enter an invite code')
    }
    acceptInviteMutation({ code: input.code })
      .then((res) => {
        refreshInvite()
        refresh()
        console.log('res', res.data)
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Invite Accepted!')
        }
      })
      .catch((err) => showNotificationError(err.message))
    return true
  }

  return (
    <Stack align="center" sx={{}} mt={32} spacing={32}>
      {data?.item ? (
        <Group spacing={4}>
          {data?.item?.owner ? <UiUserLink user={data?.item?.owner} /> : 'Anon'} invited you to PubKey!
        </Group>
      ) : (
        <EarlyAcceptInviteForm submit={acceptInvite} />
      )}
      {user?.status === UserStatus.Active ? <EarlyInviteList /> : null}

      <Text color="dimmed" size="lg" align="center">
        To get early access, take the following steps:
      </Text>
      <Group position="center">
        <Tooltip label="Follow @PubKeyApp on Twitter">
          <Button
            variant="outline"
            component="a"
            href="https://twitter.com/intent/user?screen_name=PubKeyApp"
            target="_blank"
            leftIcon={<IconSquareRoundedNumber1 size={36} />}
            rightIcon={<IconBrandTwitter size={36} />}
          >
            Follow us Twitter
          </Button>
        </Tooltip>
        <Tooltip label="Share your #PID on Twitter and tag @PubKeyApp">
          <Button
            variant="outline"
            component="a"
            href={`https://twitter.com/intent/tweet?text=${text}`}
            target="_blank"
            leftIcon={<IconSquareRoundedNumber2 size={36} />}
            rightIcon={<IconBrandTwitter size={36} />}
          >
            Share on Twitter
          </Button>
        </Tooltip>
        <Tooltip label="Join our Discord and share your PID Tweet">
          <Button
            variant="outline"
            component="a"
            href="https://pubkey.app/join-discord"
            target="_blank"
            leftIcon={<IconSquareRoundedNumber3 size={36} />}
            rightIcon={<IconBrandDiscord size={36} />}
          >
            Join our Discord
          </Button>
        </Tooltip>
      </Group>
    </Stack>
  )
}

export function EarlyInviteList() {
  const [{ data }] = useUserInvitesQuery()

  return (
    <Stack>
      {data?.items?.length ? (
        <Stack>
          <Text color="dimmed" size="lg" align="center">
            Share an invite with your friends!
          </Text>
          <Group position="center">
            {data?.items?.map((item) => (
              <EarlyInviteItem key={item.id} invite={item} />
            ))}
          </Group>
        </Stack>
      ) : (
        <Text color="dimmed" size="sm" align="center">
          You have no invites to share.
        </Text>
      )}
    </Stack>
  )
}
