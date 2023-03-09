import { Anchor, Button, createStyles, Group, Paper, Stack, Text } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkeyapp/web/util/sdk'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter, IconCurrencySolana } from '@tabler/icons-react'
import React, { ReactElement } from 'react'
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
  const { classes } = useStyles()

  const links: { icon: ReactElement; label: string; link: string; identity?: Identity }[] = [
    {
      icon: <IconCurrencySolana size={36} />,
      label: 'Solana',
      link: `/intent/connect/solana`,
      identity: identities.find((i) => i.provider === IdentityProvider.Solana),
    },
    {
      icon: <IconBrandTwitter size={36} />,
      label: 'Twitter',
      link: `/intent/connect/twitter`,
    },
    {
      icon: <IconBrandDiscord size={36} />,
      label: 'Discord',
      link: `/intent/connect/discord`,
      identity: identities.find((i) => i.provider === IdentityProvider.Discord),
    },
    {
      icon: <IconBrandGithub size={36} />,
      label: 'GitHub',
      link: `/intent/connect/github`,
      identity: identities.find((i) => i.provider === IdentityProvider.Github),
    },
  ]

  return (
    <Stack>
      {links.map((link) => (
        <Anchor
          component={Link}
          key={link.label}
          to={link.identity ? `/settings/identities` : '/dashboard'}
          className={classes.shareItem}
          py="md"
          px="md"
          sx={{ borderRadius: 50 }}
        >
          <Group position="apart">
            <Group spacing="xl">
              {link.icon}
              <Stack spacing="xs">
                <Text size="xl">{link.label}</Text>
              </Stack>
            </Group>
            {!link.identity ? <Button disabled>Coming Soon</Button> : <Button variant="default">Manage</Button>}
          </Group>
        </Anchor>
      ))}
    </Stack>
  )
}
