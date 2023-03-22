import { useCreateUser } from '@gumhq/react-sdk'
import { Anchor, Paper, Skeleton, Text } from '@mantine/core'
import { AccountIsNotVerified } from '@pubkeyapp/web/account/ui'
import { GumLogo } from '@pubkeyapp/web/apps/ui'
import { TransactionTracker } from '@pubkeyapp/web/gum/ui'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { UiError } from '@pubkeyapp/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import { AccountType, NetworkType, UserGetAccountDocument } from '@pubkeyapp/web/util/sdk'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import React, { useEffect, useMemo, useState } from 'react'
import { useClient } from 'urql'

export function DashboardGumUserCreate() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [creating, setCreating] = useState<boolean>(false)
  const { sdk } = useGumApp()
  const client = useClient()
  const [signature, setSignature] = useState<string | undefined>(undefined)
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

  const hasBalance = useMemo(() => typeof balance !== undefined && Number(balance) > 1 * LAMPORTS_PER_SOL, [balance])

  return hasBalance ? (
    <Skeleton visible={loading} radius="lg">
      <Paper>
        {signature ? <TransactionTracker signature={signature} /> : null}
        {createUserError ? <UiError title={createUserError.message} /> : null}
        <AccountIsNotVerified
          network={NetworkType.SolanaDevnet}
          type={AccountType.GumUser}
          loading={isCreatingUser || loading}
          icon={<GumLogo width={128} />}
          onClick={() => {
            if (!publicKey) return
            setCreating(true)
            let pda: string | undefined
            sdk.user
              .create(new PublicKey(publicKey))
              .then((res) => {
                pda = res.userPDA?.toString()
                console.log(`Creating Gum user ${pda}`)
                return res.instructionMethodBuilder.rpc({ commitment: 'confirmed' })
              })
              .then((res) => {
                console.log(res)
                setSignature(res)
                showNotificationSuccess('Gum User created')
                return client.query(UserGetAccountDocument, { network: NetworkType.SolanaDevnet, address: pda })
              })
              .catch((err) => {
                console.log(err)
                showNotificationError('Gum User creation failed')
              })
              .finally(() => setCreating(false))
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
      </Paper>
    </Skeleton>
  ) : (
    <div />
  )
}
