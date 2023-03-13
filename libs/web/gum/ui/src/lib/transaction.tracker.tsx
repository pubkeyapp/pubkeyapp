import { Code, Container, Group, Progress, Stack } from '@mantine/core'
import { UiLinkExplorers } from '@pubkeyapp/web/ui/core'
import { NetworkType } from '@pubkeyapp/web/util/sdk'
import { useConnection } from '@solana/wallet-adapter-react'
import React, { useEffect, useMemo, useState } from 'react'

export function TransactionTracker({ signature }: { signature: string }) {
  const { connection } = useConnection()
  const [confirmations, setConfirmations] = useState(0)
  const [finalized, setFinalized] = useState(false)
  const [interval1, setInt] = useState<number | null>(null)

  const progress = useMemo(() => {
    if (finalized) return 100
    const totalConfirmations = 32
    return (confirmations / totalConfirmations) * 100
  }, [confirmations, finalized])

  async function getStatus() {
    console.log(` => getStatus(${signature})`)
    return connection.getSignatureStatus(signature, { searchTransactionHistory: true }).then((res) => {
      if (res.value?.confirmationStatus === 'finalized') {
        if (interval1) {
          console.log('clearing Interval')
          clearInterval(interval1)
        }
        setConfirmations(32)
        setFinalized(true)
        return res
      }
      if (res.value?.confirmations) {
        setConfirmations(res.value?.confirmations)
      } else {
        console.log('getParsedTransaction res', res)
      }
    })
  }

  // Ping every 2 seconds
  useEffect(() => {
    let intervl: any = null
    getStatus().then((res) => {
      if (res?.value?.confirmationStatus === 'finalized') {
        console.log('Finalized! clearing Interval 1')
        setConfirmations(32)
        setFinalized(true)
        clearInterval(intervl)
        return
      }
      intervl = setInterval(() => {
        getStatus().then((res) => {
          if (res?.value?.confirmationStatus === 'finalized') {
            console.log('Finalized! clearing Interval 2')
            setConfirmations(32)
            setFinalized(true)
            clearInterval(intervl)
          }
        })
      }, 2000)
      setInt(intervl)
    })
    return () => {
      console.log('clearer Interval')
      clearInterval(intervl)
    }
  }, [])

  if (!signature) return null

  return (
    <Container size="sm">
      <Stack>
        <Progress size="xl" value={progress} color={progress === 100 ? 'green' : 'brand'} animate={progress > 100} />
        <Group position="center">
          <UiLinkExplorers path={`tx/${signature}`} network={NetworkType.SolanaDevnet} />
        </Group>
        <Group position="center">
          <Code color="brand">{signature}</Code>
        </Group>
      </Stack>
    </Container>
  )
}
