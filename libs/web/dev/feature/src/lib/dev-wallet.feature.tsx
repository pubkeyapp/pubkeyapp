import { Box, Button, Group, Stack } from '@mantine/core'

import React from 'react'
import {
  useWalletModal,
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton,
  WalletConnectButton,
} from '@pubkeyapp/wallet-adapter-mantine-ui'

export function DevWalletFeature() {
  return (
    <WalletModalProvider>
      <DevWalletScreen />
    </WalletModalProvider>
  )
}

export function DevWalletScreen() {
  const { visible, setVisible } = useWalletModal()
  return (
    <Box>
      <Stack spacing={64} mt={64}>
        <Group position="center">
          <Button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'} Wallet Modal</Button>
        </Group>

        <Group position="center">
          <WalletMultiButton />
          <WalletMultiButton />
          <WalletConnectButton />
          <WalletDisconnectButton />
        </Group>
      </Stack>
    </Box>
  )
}
