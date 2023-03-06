import { Center, Stack } from '@mantine/core'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'

export function LoginFeature() {
  return (
    <Stack h={'100%'} justify="center" align="center">
      <Center>
        <WalletMultiButton />
      </Center>
    </Stack>
  )
}
