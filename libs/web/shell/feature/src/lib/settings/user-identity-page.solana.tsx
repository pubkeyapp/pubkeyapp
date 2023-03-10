import { Group, Stack } from '@mantine/core'
import { UiDebug, UiLinkExplorers } from '@pubkeyapp/web/ui/core'
import { Identity, NetworkType } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { AccountTable } from './account.table'

export function UserIdentityPageSolana({ identity }: { identity: Identity }) {
  return (
    <Stack spacing={36}>
      <UiLinkExplorers path={`account/${identity.providerId}`} />

      <AccountTable accounts={identity.accounts ?? []} network={NetworkType.SolanaMainnet} />
      <AccountTable accounts={identity.accounts ?? []} network={NetworkType.SolanaDevnet} />

      {/*<UiDebug data={identity.accounts ?? []} open />*/}
      <Group>{/*<Button co/>*/}</Group>
    </Stack>
  )
}
