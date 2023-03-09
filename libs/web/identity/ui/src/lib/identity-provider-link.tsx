import { Anchor } from '@mantine/core'
import { IdentityProvider } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function IdentityProviderLink({
  provider,
  providerId,
  username,
}: {
  provider: IdentityProvider
  providerId: string
  username?: string
}) {
  switch (provider) {
    case IdentityProvider.Discord:
      return (
        <Anchor color="brand" component={'a'} href={`https://discordapp.com/users/${providerId}`} target="_blank">
          {username ?? providerId}
        </Anchor>
      )
    case IdentityProvider.Github:
      return (
        <Anchor color="brand" component={'a'} href={`https://github.com/${username}`} target="_blank">
          {username ?? providerId}
        </Anchor>
      )
    case IdentityProvider.Solana:
      return (
        <Anchor color="brand" component={Link} to={`/account/${providerId}`}>
          {username ?? providerId}
        </Anchor>
      )
  }
  return <div>{providerId}</div>
}
