import { useCreateUser } from '@gumhq/react-sdk'
import { Anchor, Box, Button, Container, Group, Stack, Text } from '@mantine/core'
import { GumLogo } from '@pubkeyapp/web/apps/ui'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UserProfilesProvider } from '@pubkeyapp/web/profile/data-access'
import { SearchBox } from '@pubkeyapp/web/search/ui'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { showNotificationError, showNotificationSuccess, UiError } from '@pubkeyapp/web/ui/core'
import { AccountType, NetworkType, useUserVerifyUserMutation } from '@pubkeyapp/web/util/sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserIdentitiesProvider } from '../settings/user-identities.provider'
import { UserManageIdentities } from '../settings/user-manage.identities'
import { UserDashboardProfileCard } from './user-dashboard-profile.card'
import { UserManageProfiles } from './user-manage.profiles'
import { AccountIsNotVerified, AccountVerifyLoading } from './user-verify.modal'

export function DashboardFeature() {
  const { user } = useAuth()
  const [, verifyUserMutation] = useUserVerifyUserMutation()

  const verifyUser = async (): Promise<boolean> => {
    return verifyUserMutation({})
      .then((res) => {
        if (res.error) {
          showNotificationError(res.error.message)
          return false
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Success')
          return true
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Stack py={32} spacing={64}>
      <Group position="center">
        <SearchBox />
      </Group>
      <Box>
        <Container size="sm">
          {user ? <UserDashboardProfileCard user={user} /> : null}
          <Stack py={64} spacing={64}>
            {user?.gumUser ? (
              <UserProfilesProvider>
                <UserManageProfiles />
              </UserProfilesProvider>
            ) : (
              <DashboardGumUser verifyUser={verifyUser} />
            )}
            <UserIdentitiesProvider>
              <UserManageIdentities />
            </UserIdentitiesProvider>
          </Stack>
        </Container>
      </Box>
      <Group mt={64} position="center">
        <Button size="xs" variant="subtle" component={Link} to="/early">
          You're early.
        </Button>
      </Group>
    </Stack>
  )
}

export function DashboardGumUser({ verifyUser }: { verifyUser?: () => Promise<boolean> }) {
  const { user } = useAuth()
  const { publicKey } = useWallet()
  const [verb, setVerb] = useState('Loading')
  const [verifying, setVerifying] = useState(false)
  const { loading, user: gumUser, sdk } = useGumApp()
  const { create, createUserError, isCreatingUser } = useCreateUser(sdk)

  useEffect(() => {
    if (gumUser?.cl_pubkey.toString() !== user?.gumUser?.address) {
      console.log('I need to do some linking!')
      console.log('user?.gumUser', user?.gumUser)
      console.log('gumUser', gumUser)

      setVerifying(true)
      verifyUser?.().then((res) => {
        setVerifying(false)
        if (res) {
          setVerb('Verified')
        } else {
          setVerb('Failed verifying')
        }
      })
    }
  }, [gumUser])

  if (loading) {
    return <AccountVerifyLoading type={AccountType.GumUser} network={NetworkType.SolanaDevnet} verb="Loading" />
  }

  if (verifying) {
    return <AccountVerifyLoading type={AccountType.GumUser} network={NetworkType.SolanaDevnet} verb="Verifying" />
  }

  if (gumUser?.cl_pubkey.toString() !== user?.gumUser?.address) {
    console.log(`Mismatch: GumUser ${gumUser?.cl_pubkey.toString()} !== ${user?.gumUser?.address} (user.gumUser)`)
    return <AccountVerifyLoading type={AccountType.GumUser} network={NetworkType.SolanaDevnet} verb="Checking" />
  }

  return (
    <Box>
      {loading ? (
        <AccountVerifyLoading type={AccountType.GumUser} network={NetworkType.SolanaDevnet} verb={verb} />
      ) : (
        <DashboardGumUserCreate />
      )}
    </Box>
  )
}

export function DashboardGumUserCreate() {
  const { publicKey } = useWallet()
  const { loading, user: gumUser, sdk } = useGumApp()
  const { create, createUserError, isCreatingUser } = useCreateUser(sdk)

  return (
    <Box>
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
    </Box>
  )
}
