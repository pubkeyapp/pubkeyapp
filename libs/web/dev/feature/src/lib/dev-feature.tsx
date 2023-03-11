import { Box, Container, Stack } from '@mantine/core'
import { UiDashboard, UiDashboardItem, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import { IconBug, IconCandy, IconCurrencySolana, IconWallet } from '@tabler/icons-react'
import React from 'react'
import { DevSolanaPay } from './dev-solana-pay'
import { DevWalletFeature } from './dev-wallet.feature'
import { GumFeature } from './gum/gum.feature'

export function DevFeature() {
  const links: UiDashboardItem[] = [
    //
    { label: 'Gum', icon: IconCandy, link: '/dev/gum' },
    { label: 'Wallet', icon: IconWallet, link: '/dev/wallet' },
    { label: 'Solana Pay', icon: IconCurrencySolana, link: '/dev/solana-pay' },
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
              { label: 'Solana Pay', value: 'solana-pay', component: <DevSolanaPay /> },
            ]}
          />
        </Stack>
      </Box>
    </Container>
  )
}
