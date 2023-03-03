import { Box, Flex, Stack } from '@mantine/core'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import { UiLogo } from '../ui-logo'
import { UiFooter } from './ui-footer'
import { UiHeader, UiLinks } from './ui-header'

export function UiLayout() {
  const logo = <UiLogo width={36} />
  const headerLinks: UiLinks = [
    { link: '/dashboard', label: 'Dashboard' },
    { link: '/about', label: 'About' },
  ]
  const footerLinks: UiLinks = [
    { link: 'https://github.com/pubkeyapp/pubkeyapp', label: 'GitHub', icon: IconBrandGithub },
    { link: 'https://twitter.com/PubKeyApp', label: 'Twitter', icon: IconBrandTwitter },
    { link: 'https://pubkey.app/join-discord', label: 'Discord', icon: IconBrandDiscord },
  ]

  return (
    <Flex h="100vh" direction="column" justify="space-between">
      <Stack>
        <UiHeader links={headerLinks} logo={logo} />
        <Box>
          <Outlet />
        </Box>
      </Stack>
      <UiFooter links={footerLinks} logo={logo} />
    </Flex>
  )
}
