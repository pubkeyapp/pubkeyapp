import { Box, Flex, Stack } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import { UiFooter } from './ui-footer'
import { UiHeader, UiLinkGroup, UiLinks } from './ui-header'

export function UiLayout() {
  const copyright = '© 2023 pubkey.app. All rights reserved.'
  const description = 'PubKey is a free, open-source, and censorship-resistant way to share your links and identities.'
  const logo = <PubKeyLogo size={36} />
  const headerLinks: UiLinks = [{ link: '/dashboard', label: 'Dashboard' }]
  const footerLinks: UiLinkGroup = [
    {
      title: 'Company',
      links: [
        { link: '/about', label: 'About' },
        { link: '/privacy', label: 'Privacy' },
        { link: '/terms', label: 'Terms' },
        { link: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Community',
      links: [
        { link: 'https://github.com/pubkeyapp/pubkeyapp', label: 'GitHub', icon: IconBrandGithub },
        { link: 'https://twitter.com/PubKeyApp', label: 'Twitter', icon: IconBrandTwitter },
        { link: 'https://pubkey.app/join-discord', label: 'Discord', icon: IconBrandDiscord },
      ],
    },
  ]
  return (
    <Flex h="100vh" direction="column" justify="space-between">
      <Stack>
        {/*<UiHeader links={headerLinks} logo={logo} />*/}
        <Box>
          <Outlet />
        </Box>
      </Stack>
      <UiFooter copyright={copyright} description={description} links={footerLinks} logo={logo} />
    </Flex>
  )
}
