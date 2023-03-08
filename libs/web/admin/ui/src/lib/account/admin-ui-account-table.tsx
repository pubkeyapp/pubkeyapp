import { ActionIcon, Code, Group, ScrollArea, Text } from '@mantine/core'
import { Account } from '@pubkeyapp/web/util/sdk'
import { IconNavigation, IconPencil } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import React from 'react'
import { Link } from 'react-router-dom'
import { AdminUiUserLink } from '../admin-ui-user-link'
import { AdminUiAccountLabel, ellipsify } from './admin-ui-account-label'

interface AdminUiAccountTableProps {
  accounts: Account[]
}

export function AdminUiAccountTable({ accounts }: AdminUiAccountTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="md"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'publicKey',
            render: (account) => <AdminUiAccountLabel account={account} />,
          },
          { accessor: 'network' },
          { accessor: 'type' },
          {
            accessor: 'program',
            render: (account) => {
              return account?.program ? <Code>{ellipsify(account.program, 8)}</Code> : 'No program'
            },
          },
          {
            accessor: 'owner',
            render: (account) => (account.owner ? <AdminUiAccountLabel account={account.owner} /> : 'No owner'),
          },
          {
            accessor: 'identity',
            render: (account) => (account.identity?.owner ? <AdminUiUserLink user={account.identity.owner} /> : 'None'),
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon component={Link} to={item?.explorerUrl + ''}>
                  <IconNavigation size={16} />
                </ActionIcon>
                <ActionIcon component={Link} to={`/admin/accounts/${item?.id}`}>
                  <IconPencil size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={accounts}
      />
    </ScrollArea>
  )
}
