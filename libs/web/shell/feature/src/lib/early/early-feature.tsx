import { Button, Code, Container, createStyles, Group, rem, Text, Title, Tooltip } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import {
  IconBrandDiscord,
  IconBrandTwitter,
  IconSquareRoundedNumber1,
  IconSquareRoundedNumber2,
  IconSquareRoundedNumber3,
} from '@tabler/icons-react'
import React from 'react'

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
      <Group position="center" sx={{ marginBottom: `calc(${theme.spacing.xl} * 1.5)` }}>
        <Tooltip label="This is your PubKey ID" withArrow>
          <Code color="brand" sx={{ fontSize: 24, borderRadius: 50 }} px="xl" py="lg">
            pid#{user?.pid}
          </Code>
        </Tooltip>
      </Group>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        To get early access, take the following steps:
      </Text>
      <EarlyFeatureActions />
    </Container>
  )
}

export function EarlyFeatureActions() {
  const { user } = useAuth()
  const text = [
    'gm @PubKeyApp... wen invite code?',
    `My %23PID is ${user?.pid} 🚀`,
    `Get yours at https://devnet.pubkey.app! 🅿️`,
  ].join('%0a%0a')

  return (
    <Group position="center">
      <Tooltip label="Follow @PubKeyApp on Twitter">
        <Button
          component="a"
          href="https://twitter.com/intent/user?screen_name=PubKeyApp"
          target="_blank"
          leftIcon={<IconSquareRoundedNumber1 />}
          rightIcon={<IconBrandTwitter size={24} />}
        >
          Follow us Twitter
        </Button>
      </Tooltip>
      <Tooltip label="Share your #PID on Twitter and tag @PubKeyApp">
        <Button
          component="a"
          href={`https://twitter.com/intent/tweet?text=${text}`}
          target="_blank"
          leftIcon={<IconSquareRoundedNumber2 />}
          rightIcon={<IconBrandTwitter size={24} />}
        >
          Share on Twitter
        </Button>
      </Tooltip>
      <Tooltip label="Join our Discord and share your PID Tweet">
        <Button
          component="a"
          href="https://pubkey.app/join-discord"
          target="_blank"
          leftIcon={<IconSquareRoundedNumber3 />}
          rightIcon={<IconBrandDiscord size={24} />}
        >
          Join our Discord
        </Button>
      </Tooltip>
    </Group>
  )
}
