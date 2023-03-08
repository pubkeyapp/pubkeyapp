import { SolanaLogo } from '@pubkeyapp/web/ui/core'
import { IdentityProvider } from '@pubkeyapp/web/util/sdk'
import { IconBrandDiscord, IconQuestionCircle } from '@tabler/icons-react'

export function IdentityProviderAvatar({ provider }: { provider: IdentityProvider }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord height={48} width={48} />
    case IdentityProvider.Solana:
      return <SolanaLogo />
  }
  return <IconQuestionCircle />
}
