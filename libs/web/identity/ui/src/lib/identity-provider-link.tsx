import { Anchor } from '@mantine/core'
import { IdentityProvider } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function IdentityProviderLink({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
  switch (provider) {
    case IdentityProvider.Solana:
      return (
        <Anchor color="brand" component={Link} to={`/account/${providerId}`}>
          {providerId}
        </Anchor>
      )
  }
  return <div>{providerId}</div>
}
