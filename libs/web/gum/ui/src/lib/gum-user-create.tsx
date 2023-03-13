import { useCreateUser } from '@gumhq/react-sdk'
import { Anchor, Box, Text } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { showNotificationSuccess, UiError } from '@pubkeyapp/web/ui/core'
import { AccountType, NetworkType, useUserVerifyUserMutation } from '@pubkeyapp/web/util/sdk'
import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import { GumNotVerified } from './gum-not-verified'
import { TransactionTracker } from './transaction.tracker'

export function GumUserCreate() {
  const { user, refresh } = useAuth()
  const [signature, setSignature] = useState<string>()
  // '3SYzZNY2D9uCLG1KChX8NwYAHdbBnuyAHQTko5uqxDPEZLqczCt1jjBVDZCruohvwjb2fQ2TpqigwcsT1KzVQP31',
  const { loading, user: gumUser, sdk } = useGumApp()
  const [{ fetching: verifying }, verifyUserMutation] = useUserVerifyUserMutation()
  const { create, createUserError, isCreatingUser } = useCreateUser(sdk)

  const createUser = () => {
    sdk.user
      .create(new PublicKey(user?.publicKey!))
      .then(({ instructionMethodBuilder }) => {
        return instructionMethodBuilder.rpc()
      })
      .then((res) => {
        console.log(res)
        console.log(' - created user', res)
        setSignature(res)
        showNotificationSuccess('Gum User created')
      })
  }

  const verifyUser = () => {
    console.log(' - verifying user')
    verifyUserMutation({})
      .then((res) => {
        refresh()
        console.log(' - verified user', res)
      })
      .catch((err) => {
        console.log(' - error verifying user', err)
      })
  }

  useEffect(() => {
    if (user?.gumUser || !gumUser || verifying) {
      // if (user?.gumUser) {
      //   console.log(' - verifying user')
      //   verifyUserMutation({})
      //   .then((res) => {
      //     console.log(' - verified user', res)
      //   })
      //   .catch((err) => {
      //     console.log(' - error verifying user', err)
      //   })
      // }
      return
    }
    console.log(' - I have a gumUser', !!gumUser)
    console.log(' - I have a user.gumUser', !!user?.gumUser)
    if (gumUser && !user?.gumUser?.gumUser) {
      verifyUser()
    }
  }, [gumUser, user?.gumUser])

  useEffect(() => {
    console.log('useEffect: gumUser', gumUser, { createUserError, isCreatingUser })
    if (gumUser || createUserError || isCreatingUser || !user?.publicKey) return
    console.log(' - creating user')
  }, [gumUser, createUserError, isCreatingUser])

  return (
    <Box>
      {createUserError ? <UiError title={createUserError.message} /> : null}
      {signature ? <TransactionTracker signature={signature} /> : null}
      <GumNotVerified
        network={NetworkType.SolanaDevnet}
        type={AccountType.GumUser}
        loading={isCreatingUser}
        // icon={<GumLogo width={128} />}
        onClick={() => {
          if (!user?.publicKey) return
          if (!gumUser) {
            createUser()
          } else {
            verifyUser()
          }
          // create(new PublicKey(user?.publicKey)).then((res) => {
          //   console.log(res)
          //   showNotificationSuccess('Gum User created')
          // })
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
    </Box>
  )
}
