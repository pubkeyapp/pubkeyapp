import { Button, SimpleGrid } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import { IdentityProvider, useUserLinkIdentityMutation } from '@pubkeyapp/web/util/sdk'
import {
  IconAt,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTwitter,
  IconCurrencySolana,
} from '@tabler/icons-react'
import { ComponentType } from 'react'

export function CreateNewIdentity() {
  const [, linkIdentity] = useUserLinkIdentityMutation()
  const items: { label: string; link: string; icon: ComponentType<{ size: number }> }[] = [
    {
      label: 'Twitter',
      link: '/api/auth/twitter',
      icon: IconBrandTwitter,
    },
    {
      label: 'Discord',
      link: '/api/auth/discord',
      icon: IconBrandDiscord,
    },
    {
      label: 'GitHub',
      link: '/api/auth/github',
      icon: IconBrandGithub,
    },
    {
      label: 'Google',
      link: '/api/auth/google',
      icon: IconBrandGoogle,
    },
  ]

  const link = (provider: IdentityProvider, providerId: string) => {
    console.log({
      provider,
      providerId,
    })
    linkIdentity({
      provider,
      providerId,
    })
      .then((res) => {
        console.log(res)
        showNotificationSuccess('Identity linked')
      })
      .catch((err) => {
        showNotificationError(err.message)
      })
  }

  return (
    <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      <Button
        variant="subtle"
        leftIcon={<IconCurrencySolana size={36} />}
        onClick={() => {
          const address = window.prompt('Enter your Solana address')
          if (address) {
            link(IdentityProvider.Solana, address)
          }
        }}
      >
        Link Solana
      </Button>
      <Button
        variant="subtle"
        leftIcon={<IconAt size={36} />}
        onClick={() => {
          const identity = window.prompt('Enter your ATProto identity')
          if (identity) {
            link(IdentityProvider.Atp, identity)
          }
        }}
      >
        Link Bluesky
      </Button>
      {items.map((item) => (
        <Button key={item.label} variant="subtle" component="a" href={item.link} leftIcon={<item.icon size={36} />}>
          Link {item.label}
        </Button>
      ))}
      <Button
        variant="subtle"
        component="a"
        target="_blank"
        href="https://twitter.com/intent/tweet?text=gm @PubKeyApp, wen more identity providers?"
        onClick={() => {
          console.log('link solana')
        }}
      >
        More coming soon...
      </Button>
    </SimpleGrid>
  )
}
