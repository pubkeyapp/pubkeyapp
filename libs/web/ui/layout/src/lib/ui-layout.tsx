import { Box, Flex, Stack } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { UiFooter } from './ui-footer'
import { UiHeader, UiLinks } from './ui-header'

export function UiLayout() {
  const copyright = '© 2023 pubkey.app.'
  const logo = <PubKeyLogo size={36} />
  const headerLinks: UiLinks = [
    //  { link: '/dashboard', label: 'Dashboard' }
  ]

  return (
    <Flex mih="100vh" h="100vh" direction="column" justify="space-between">
      <Stack sx={{ flexGrow: 1 }}>
        <UiHeader links={headerLinks} logo={logo} />
        <Box h="100%">
          <Suspense fallback={<UiLoader type="full" />}>
            <Outlet />
          </Suspense>
        </Box>
      </Stack>
      <UiFooter copyright={copyright} logo={logo} />
    </Flex>
  )
}
