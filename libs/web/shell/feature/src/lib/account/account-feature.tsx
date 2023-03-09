import { ActionIcon, Box, Button, Container, Group, Stack, Text } from '@mantine/core'
import { SolanaLogo } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import { NetworkType } from '@pubkeyapp/web/util/sdk'
import { useMemo, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { AccountDetailsTab } from './account-details.tab'

export function AccountFeature() {
  return (
    <Routes>
      <Route path=":address/*" element={<AccountDetailsFeature />} />
    </Routes>
  )
}

export function AccountDetailsFeature() {
  const cluster = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('cluster')?.toLowerCase().replace('solana', '')
  }, [])

  const { address } = useParams<{ address: string }>()
  const [network, setNetwork] = useState(() =>
    cluster === 'devnet' ? NetworkType.SolanaDevnet : NetworkType.SolanaMainnet,
  )
  return (
    <Container size="xl">
      <Stack>
        <UiPageHeader
          title={
            <Text component={Link} to={`/account/${address}`} size="xl" weight={500}>
              {address}
            </Text>
          }
          leftAction={
            <ActionIcon component={Link} to={`/account/${address}`}>
              <SolanaLogo height={32} />
            </ActionIcon>
          }
          rightAction={
            <Group>
              {Object.values(NetworkType).map((type) => (
                <Button
                  key={type}
                  variant={type === network ? 'filled' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setNetwork(type)
                  }}
                >
                  {type.replace('Solana', '')}
                </Button>
              ))}
            </Group>
          }
        />
        <Box>
          <Container size="md">
            <AccountDetailsTab network={network} address={address!} />
          </Container>
        </Box>
      </Stack>
    </Container>
  )
}
