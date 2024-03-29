import { Avatar, Badge, Box, ThemeIcon, Tooltip } from '@mantine/core'
import { SolanaLogo } from '@pubkeyapp/web/ui/core'
import { Identity, IdentityProvider } from '@pubkeyapp/web/util/sdk'
import {
  IconAt,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTwitter,
  IconCurrencySolana,
  IconQuestionCircle,
} from '@tabler/icons-react'

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

export function IdentityProviderAvatar({ provider, size = 48 }: { provider: IdentityProvider; size?: number }) {
  switch (provider) {
    case IdentityProvider.Atp:
      return <IconAt size={size} />
    case IdentityProvider.Discord:
      return <IconBrandDiscord size={size} />
    case IdentityProvider.Github:
      return <IconBrandGithub size={size} />
    case IdentityProvider.Google:
      return <IconBrandGoogle size={size} />
    case IdentityProvider.Solana:
      return <IconCurrencySolana size={size} />
    case IdentityProvider.Twitter:
      return <IconBrandTwitter size={size} />
  }
  return <IconQuestionCircle size={size} />
}
export function IdentityProviderLabel({ identity }: { identity: Identity }): string {
  switch (identity.provider) {
    case IdentityProvider.Atp:
      return identity.profile?.handle ?? identity.name ?? identity.providerId
    case IdentityProvider.Solana:
      return ellipsify(identity.providerId)
  }
  return identity?.profile?.username ?? `${identity.provider} Account`
}

export function IdentityBadge({ identity }: { identity: Identity }) {
  const avatarUrl = identity?.profile?.avatarUrl || identity?.profile?.avatar
  return (
    <Tooltip label={`${identity.provider} identity`} withArrow position="right">
      <Badge
        pl={0}
        size="xl"
        color="brand"
        radius="xl"
        pr={5}
        leftSection={
          avatarUrl ? (
            <Avatar size={32} mr={4} src={avatarUrl} radius="xl" />
          ) : (
            <Box w={32} h={32} pt={4} pl={8}>
              {identity.provider === IdentityProvider.Atp && <IconAt width={24} height={24} />}
              {identity.provider === IdentityProvider.Solana && <SolanaLogo width={18} height={18} />}
            </Box>
          )
        }
        rightSection={
          <ThemeIcon size="xl" color="brand" variant="transparent" radius="xl">
            <IdentityProviderAvatar provider={identity.provider as IdentityProvider} size={24} />
          </ThemeIcon>
        }
        styles={{ inner: { textTransform: 'none' } }}
      >
        {IdentityProviderLabel({ identity })}
      </Badge>
    </Tooltip>
  )
}
