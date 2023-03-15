import { Alert, Button, Group, Stack, Text } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { useAnonSolanaRequestAirdropMutation } from '@pubkeyapp/web/util/sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { useEffect, useMemo, useState } from 'react'

export function RequestAirdrop({ required = 1 }: { required?: number }) {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [{ fetching: requesting }, solanaRequestAirdrop] = useAnonSolanaRequestAirdropMutation()

  const updateBalance = () => {
    if (!publicKey) return
    return connection
      .getBalance(new PublicKey(publicKey))
      .then((bal) => {
        console.log(bal)
        setBalance(bal)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!publicKey || !connection) return
    updateBalance()
  }, [publicKey, connection])

  const requestAirdrop = () => {
    if (!publicKey) return
    solanaRequestAirdrop({
      address: publicKey.toString(),
      lamports: 0.5 * LAMPORTS_PER_SOL,
    })
      .then((res) => {
        console.log(res)
        updateBalance()
        showNotificationSuccess('Airdrop requested')
      })
      .catch((err) => {
        console.log(err)
        showNotificationError('Airdrop failed')
      })
  }

  const hasBalance = useMemo(() => {
    return typeof balance !== undefined && Number(balance) > required * LAMPORTS_PER_SOL
  }, [balance])

  if (hasBalance || loading) {
    return null
  }

  return (
    <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="yellow" variant="outline" radius="lg">
      <Stack>
        <Text>You don't have enough SOL on Solana Devnet!</Text>
        <Group>
          <Button loading={requesting} color="yellow" variant="subtle" onClick={requestAirdrop}>
            Request Airdrop
          </Button>
        </Group>
      </Stack>
    </Alert>
  )
}
