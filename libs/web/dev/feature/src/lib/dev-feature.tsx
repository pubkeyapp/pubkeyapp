import { Box, Container, Stack } from '@mantine/core'
import { UiDashboard, UiDashboardItem, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import { IconBug, IconCandy, IconWallet } from '@tabler/icons-react'
import React from 'react'
import { DevWalletFeature } from './dev-wallet.feature'
import { GumFeature } from './gum/gum.feature'

export function DevFeature() {
  const links: UiDashboardItem[] = [
    //
    { label: 'Gum', icon: IconCandy, link: '/dev/gum' },
    { label: 'Wallet', icon: IconWallet, link: '/dev/wallet' },
  ]
  return (
    <Container size="lg">
      <Box p="md">
        <Stack>
          <UiPageHeader title="Developer Tools" leftAction={<IconBug />} />
          <UiTabRoutes
            tabs={[
              { label: 'Dashboard', value: 'dashboard', component: <UiDashboard links={links} /> },
              { label: 'Gum', value: 'gum', component: <GumFeature /> },
              { label: 'Wallet', value: 'wallet', component: <DevWalletFeature /> },
            ]}
          />
        </Stack>
      </Box>
    </Container>
  )
}
