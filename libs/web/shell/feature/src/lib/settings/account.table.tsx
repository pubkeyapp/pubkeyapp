import { Anchor, Avatar, Group, Stack, Table, Text } from '@mantine/core'
import { ellipsify, getAvatarUrl, UiDebugModal } from '@pubkeyapp/web/ui/core'
import { Account, AccountType, NetworkType } from '@pubkeyapp/web/util/sdk'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

export function AccountTable({ accounts = [], network }: { accounts: Account[]; network: NetworkType }) {
  const items = useMemo(() => sortByType(accounts).filter((a) => a.network === network), [accounts])

  const rows = items.map((account) => {
    const avatarUrl =
      account.metadata?.fetched?.image ?? account.metadata?.fetched?.image ?? getAvatarUrl(`${account.address}`)
    return (
      <tr key={account.address}>
        <td>
          <Group position="apart">
            <Group align="center" spacing="xs">
              <Avatar src={avatarUrl} size={64} />
              <Stack spacing={0}>
                <Anchor color="brand" component={Link} to={`/account/${account.address}`}>
                  {(account?.name?.length ?? 0) > 30 ? ellipsify(account.name!, 10) : account.name}
                </Anchor>
                <Anchor color="dimmed" component={Link} to={`/account/${account.program}`}>
                  {account.type}
                </Anchor>
              </Stack>
            </Group>
            <UiDebugModal data={account} />
          </Group>
          {account.type === AccountType.MetaplexNft ? (
            <Stack>
              {/*<AccountTypeCardMetaplexNft account={account} />*/}
              {/*<UiDebug data={account.metadata} />*/}
            </Stack>
          ) : null}
        </td>
      </tr>
    )
  })
  return items.length ? (
    <Stack mah={800} sx={{ overflow: 'auto' }}>
      <Text size="lg">{network.replace('Solana', 'Solana ')}</Text>
      <Table>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  ) : null
}

export function sortByType(items: Account[]) {
  return items.sort((a, b) => {
    if (a.type! < b.type!) {
      return -1
    }
    if (a.type! > b.type!) {
      return 1
    }
    return 0
  })
}
