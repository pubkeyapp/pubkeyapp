import { ActionIcon, Avatar, Badge, Box } from '@mantine/core'
import { SolanaLogo } from '@pubkeyapp/web/ui/core'
import { Identity, IdentityProvider } from '@pubkeyapp/web/util/sdk'
import { IconBrandDiscord, IconBrandGithub, IconCurrencySolana, IconQuestionCircle } from '@tabler/icons-react'
import React from 'react'

export function IdentityProviderAvatar({ provider, size = 48 }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord size={size} />
    case IdentityProvider.Github:
      return <IconBrandGithub size={size} />
    case IdentityProvider.Solana:
      return <IconCurrencySolana size={size} />
  }
  return <IconQuestionCircle size={size} />
}

export function IdentityProviderBadge({ identity }: { identity: Identity }) {
  const avatarUrl = identity?.profile?.avatarUrl
  return (
    <Badge
      pl={0}
      size="lg"
      color="brand"
      radius="xl"
      pr={5}
      leftSection={
        avatarUrl ? (
          <Avatar size={24} mr={5} src={avatarUrl} radius="xl" />
        ) : (
          <Box mt={6} ml={5}>
            <SolanaLogo width={16} height={16} />
          </Box>
        )
      }
      rightSection={
        <ActionIcon size="xs" color="brand" variant="transparent" radius="xl">
          <IdentityProviderAvatar provider={identity.provider as IdentityProvider} size={16} />
        </ActionIcon>
      }
    >
      {identity?.profile?.username ?? `${identity.provider} Account`}
    </Badge>
  )
}
