import { Box, Paper, Title } from '@mantine/core'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { GumApp } from './gum-app'
import { GumAppProvider, useGumSDK } from './use-gum-app'

export function GumFeature() {
  const { connection } = useConnection()
  const wallet = useWallet()

  const sdk = useGumSDK(connection, { commitment: 'confirmed' }, 'devnet')

  if (wallet.connecting) {
    return (
      <Paper>
        <Box py={'lg'}>
          <UiLoader />
        </Box>
      </Paper>
    )
  }

  if (!wallet.connected || !wallet?.publicKey) {
    return (
      <Paper>
        <Title align="center" order={2}>
          Connect your wallet to continue
        </Title>
      </Paper>
    )
  }

  if (!sdk) {
    return (
      <Paper>
        <Title align="center" order={2}>
          Loading Gum App...
        </Title>
      </Paper>
    )
  }

  return (
    <GumAppProvider owner={wallet.publicKey} sdk={sdk}>
      <GumApp />
    </GumAppProvider>
  )
}
