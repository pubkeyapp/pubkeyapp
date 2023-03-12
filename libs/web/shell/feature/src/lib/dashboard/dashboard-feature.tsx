import { useCreateUser } from '@gumhq/react-sdk'
import { Anchor, Box, Button, Container, Group, Paper, Skeleton, Stack, Text } from '@mantine/core'
import { GumLogo } from '@pubkeyapp/web/apps/ui'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UserProfilesProvider } from '@pubkeyapp/web/profile/data-access'
import { SearchBox } from '@pubkeyapp/web/search/ui'
import { useGumApp } from '@pubkeyapp/web/shell/data-access'
import { showNotificationError, showNotificationSuccess, UiError } from '@pubkeyapp/web/ui/core'
import { AccountType, NetworkType, useUserVerifyUserMutation } from '@pubkeyapp/web/util/sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { Link } from 'react-router-dom'
import { UserIdentitiesProvider } from '../settings/user-identities.provider'
import { UserManageIdentities } from '../settings/user-manage.identities'
import { UserDashboardProfileCard } from './user-dashboard-profile.card'
import { UserManageProfiles } from './user-manage.profiles'
import { AccountIsNotVerified } from './user-verify.modal'

export function DashboardFeature() {
  const { user } = useAuth()
  const { loading, user: gumUser } = useGumApp()
  const [, verifyUserMutation] = useUserVerifyUserMutation()

  function verifyUser() {
    verifyUserMutation({})
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Success')
        }
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
            {gumUser ? (
              gumUser.cl_pubkey.toString() === user?.gumUser?.address ? (
                <Skeleton visible={loading} radius="xl">
                  <UserProfilesProvider>
                    <UserManageProfiles />
                  </UserProfilesProvider>
                </Skeleton>
              ) : (
                <Paper>
                  <UiError
                    title={`Gum User ${gumUser.cl_pubkey.toString()} exists, but is different from the one in the database ${
                      user?.gumUser?.address
                    }`}
                  />
                  <Button onClick={verifyUser}>Verify</Button>
                </Paper>
              )
            ) : (
              <DashboardGumUser />
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

export function DashboardGumUser() {
  const { sdk } = useGumApp()
  const { publicKey } = useWallet()
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
// curl 'https://light-pelican-32.hasura.app/v1/graphql' \
//   --data-raw $'{"query":"\\n      query GetUser ($owner: String\u0021) {\\n        gum_0_1_0_decoded_user(where: { authority: { _eq: $owner } }) {\\n          authority\\n          cl_pubkey\\n          randomhash\\n        }\\n      }\\n    ","variables":{"owner":"DSgca71LD2x37AoKbBEi9RvsoXWtR1UFCusMah1ckhko"},"operationName":"GetUser"}' \
//   --compressed
