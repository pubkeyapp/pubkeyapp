import { Badge, Box, Group, Paper, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { GumUiLayout, GumUserCreate } from '@pubkeyapp/web/gum/ui'
import { ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { UiDebug, UiError, UiLoader, UiProfileLink, UiUserLink } from '@pubkeyapp/web/ui/core'
import { Account, NetworkType, ProfileType, useUserGetAccountQuery } from '@pubkeyapp/web/util/sdk'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { WebGumProfileDetails } from './web-gum-profile.details'
import { WebGumUserDetails } from './web-gum-user.details'

export function WebGumFeature() {
  return (
    <Routes>
      <Route path=":network" element={<WebUserGumLoader />} />
      <Route path=":network/:address/*" element={<WebGumLoader />} />
    </Routes>
  )
}

export function WebUserGumLoader() {
  const { user } = useAuth()
  const { network } = useParams<{ address: string; network: NetworkType }>()

  if (!network) {
    console.log('Invalid address or network', { network })
    return <div>Invalid address or network</div>
  }

  // FIXME: Make Gum work with other networks outside Solana Devnet
  if (!Object.values(NetworkType).includes(network) || network !== NetworkType.SolanaDevnet) {
    console.log('Invalid network', { network })
    return <div>Invalid network: {network}</div>
  }

  return (
    <Routes>
      <Route path="*" element={<Navigate replace to={`./${user?.publicKey}`} />} />
    </Routes>
  )
}

export function WebGumLoader() {
  const { address, network } = useParams<{ address: string; network: NetworkType }>()

  if (!address || !network) {
    console.log('Invalid address or network', { address, network })
    return <div>Invalid address or network</div>
  }

  // FIXME: Make Gum work with other networks outside Solana Devnet
  if (!Object.values(NetworkType).includes(network) || network !== NetworkType.SolanaDevnet) {
    console.log('Invalid network', { address, network })
    return <div>Invalid network: {network}</div>
  }

  return (
    <GumUiLayout link={`/apps/gum/${network}/${address}`}>
      <WebGumRoutes address={address} network={network} />
    </GumUiLayout>
  )
}
export function WebGumRoutes({ address, network }: { address: string; network: NetworkType }) {
  return (
    <Routes>
      <Route path="profile/*" element={<WebGumProfileDetails address={address} network={network} />} />
      <Route path="user/*" element={<WebGumUserDetails address={address} network={network} />} />
      <Route path="*" element={<WebGumAccountMain network={network} address={address} />} />
    </Routes>
  )
}

export function WebGumAccountMain({ network, address }: { address: string; network: NetworkType }) {
  const { user } = useAuth()
  const [{ data, fetching }] = useUserGetAccountQuery({ variables: { address, network } })

  if (fetching) {
    return <UiLoader />
  }
  if (!data?.item) {
    return <UiError error="Account not found" />
  }

  const account = data.item as Account

  return (
    <Stack align="center" justify="space-between" h="100%" w="100%" py={32}>
      <Box w="100%">
        <Stack spacing={32}>
          {account?.gumUser ? (
            <Paper>
              <Group>
                <Badge color="pink">Gum User</Badge>
                <UiUserLink user={account?.gumUser} to={`/apps/gum/${network}/${address}/user`} />
              </Group>
            </Paper>
          ) : user?.publicKey === address ? (
            <GumUserCreate />
          ) : null}
          {account?.gumProfile ? (
            <Paper>
              <Group>
                <ProfileTypeBadge
                  profileType={account.gumProfile.type as ProfileType}
                  verified={!!account.gumProfile.gumProfile}
                />
                <UiProfileLink profile={account.gumProfile} to={`/apps/gum/${network}/${address}/profile`} />
              </Group>
            </Paper>
          ) : null}
          <UiDebug data={{ data: account }} />
        </Stack>
      </Box>
    </Stack>
  )
}
