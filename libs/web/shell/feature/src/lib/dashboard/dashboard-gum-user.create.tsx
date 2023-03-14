import { useCreateUser } from '@gumhq/react-sdk'
import { Alert, Anchor, Button, Group, Skeleton, Stack, Text } from '@mantine/core'
import { GumLogo } from '@pubkeyapp/web/apps/ui'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { showNotificationError, showNotificationSuccess, UiError } from '@pubkeyapp/web/ui/core'
import { AccountType, NetworkType, useAnonSolanaRequestAirdropMutation } from '@pubkeyapp/web/util/sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { IconAlertCircle } from '@tabler/icons-react'
import React, { useEffect, useMemo, useState } from 'react'
import { AccountIsNotVerified } from './account-is-not.verified'

export function DashboardGumUserCreate() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [{ fetching: requesting }, solanaRequestAirdrop] = useAnonSolanaRequestAirdropMutation()
  const { sdk } = useGumApp()
  const { create, createUserError, isCreatingUser } = useCreateUser(sdk)

  const updateBalance = () => {
    if (!publicKey) return
    setLoading(true)
    return connection
      .getBalance(new PublicKey(publicKey))
      .then((bal) => {
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
    return typeof balance !== undefined && Number(balance) > 0
  }, [balance])

  return (
    <Skeleton visible={loading} radius="lg">
      {hasBalance ? (
        <Stack>
          {createUserError ? <UiError title={createUserError.message} /> : null}
          <AccountIsNotVerified
            network={NetworkType.SolanaDevnet}
            type={AccountType.GumUser}
            loading={isCreatingUser}
            icon={<GumLogo width={128} />}
            onClick={() => {
              if (!publicKey) return
              create(new PublicKey(publicKey)).then((res) => {
                console.log(res)
                showNotificationSuccess('Gum User created')
              })
            }}
            more={
              <Text align="center">
                PubKey uses the{' '}
                <Anchor href="https://gum.fun" target="_blank" color="brand">
                  Gum protocol
                </Anchor>{' '}
                to verify users. This is done by creating a Gum account and linking it to your PubKey account.
              </Text>
            }
          />
        </Stack>
      ) : (
        <Stack>
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
        </Stack>
      )}
    </Skeleton>
  )
}
