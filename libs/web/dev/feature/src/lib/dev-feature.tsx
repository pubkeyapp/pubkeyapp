import { Box, Button, Container, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { RequestAirdrop } from '@pubkeyapp/web/dev/ui'
import { UiDashboard, UiDashboardItem, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import { useAdminIndexGumAccountsMutation, useUserVerifyUserMutation } from '@pubkeyapp/web/util/sdk'
import { IconBug, IconCandy, IconCurrencySolana, IconWallet } from '@tabler/icons-react'
import React from 'react'
import { DevSolanaPay } from './dev-solana-pay'
import { DevWalletFeature } from './dev-wallet.feature'
import { GumFeature } from './gum/gum.feature'

export function DevFeature() {
  const { user } = useAuth()
  const [, verifyUserMutation] = useUserVerifyUserMutation()
  const [, indexGumMutation] = useAdminIndexGumAccountsMutation()

  const verify = () => {
    console.log('verify', user)
    verifyUserMutation({}).then((res) => {
      console.log('verify res', res)
    })
  }
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
          <Box>
            <Button onClick={verify}>Verify User</Button>
            <Button onClick={() => indexGumMutation({})}>Index Gum</Button>
          </Box>
          <Box>
            <RequestAirdrop required={10} />
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}
