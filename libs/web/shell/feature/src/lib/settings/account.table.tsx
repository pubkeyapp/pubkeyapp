import { Anchor, Avatar, Group, Stack, Table, Text } from '@mantine/core'
import { ellipsify, getAvatarUrl, UiDebug } from '@pubkeyapp/web/ui/core'
import { Account, AccountType, NetworkType } from '@pubkeyapp/web/util/sdk'
import React, { useMemo } from 'react'
import { AccountTypeCardMetaplexNft } from './account-type-card-metaplex-nft'

export function AccountTable({ accounts = [], network }: { accounts: Account[]; network: NetworkType }) {
  const items = useMemo(() => sortByType(accounts).filter((a) => a.network === network), [accounts])

  const rows = items.map((account) => (
    <tr key={account.address}>
      <td>
        <Group align="center" spacing="xs">
          <Avatar src={getAvatarUrl(account.address + '')} />
          <Stack spacing={0}>
            <Anchor
              color="brand"
              component={'a'}
              href={`https://solscan.io/account/${account.address}`}
              target="_blank"
            >
              {(account?.name?.length ?? 0) > 30 ? ellipsify(account.name!, 10) : account.name}
            </Anchor>
            <Anchor
              color="dimmed"
              component={'a'}
              href={`https://solscan.io/account/${account.program}`}
              target="_blank"
            >
              {account.type}
            </Anchor>
          </Stack>
        </Group>
        {account.type === AccountType.MetaplexNft ? (
          <Stack>
            <AccountTypeCardMetaplexNft account={account} />
            {/*<UiDebug data={account.metadata} />*/}
          </Stack>
        ) : null}
      </td>
    </tr>
  ))
  return (
    <Stack mah={1200} sx={{ overflow: 'auto' }}>
      <Text size="lg">{network.replace('Solana', 'Solana ')}</Text>
      <Table>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  )
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
