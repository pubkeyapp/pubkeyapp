import { Box, Flex, Stack } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import { UiFooter } from './ui-footer'
import { UiHeader, UiLinks } from './ui-header'

export function UiLayout() {
  const logo = <PubKeyLogo size={36} />
  const headerLinks: UiLinks = [
    { link: '/dashboard', label: 'Dashboard' },
    { link: '/components', label: 'Components' },
  ]
  const footerLinks: UiLinks = [
    { link: 'https://github.com/pubkeyapp/pubkeyapp', label: 'GitHub', icon: IconBrandGithub },
    { link: 'https://twitter.com/PubKeyApp', label: 'Twitter', icon: IconBrandTwitter },
    { link: 'https://pubkey.app/join-discord', label: 'Discord', icon: IconBrandDiscord },
  ]

  return (
    <Flex h="100vh" direction="column" justify="space-between">
      <Box sx={{ flexGrow: 1, border: '1px solid red' }}>
        <UiHeader links={headerLinks} logo={logo} />
        <Box>
          <Outlet />
        </Box>
      </Box>
      <UiFooter links={footerLinks} logo={logo} />
    </Flex>
  )
}
