import { ActionIcon, Anchor, Avatar, Code, Group, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { UiCopy } from '@pubkeyapp/web/ui/core'
import { Invite } from '@pubkeyapp/web/util/sdk'
import { IconPencil, IconTrash } from '@tabler//icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

interface AdminInviteTableProps {
  invites: Invite[]
  deleteInvite: (invite: Invite) => void
}

export function InviteTable({ deleteInvite, invites }: AdminInviteTableProps) {
  const theme = useMantineTheme()
  return (
    <ScrollArea>
      <DataTable
        borderRadius="xl"
        styles={{ root: { paddingTop: 10 } }}
        sx={{ borderWidth: 4 }}
        withBorder
        shadow="xs"
        columns={[
          {
            title: 'Inviter',
            accessor: 'owner.name',
            render: (item) => (
              <Anchor component={Link} to={`/admin/users/${item?.owner?.id}`} color={theme.colors.brand[4]}>
                <Group spacing="xs">
                  <Avatar size="sm" src={item?.owner?.profile?.avatarUrl ?? ''} radius={50} />
                  <Text>{item.owner?.username}</Text>
                </Group>
              </Anchor>
            ),
          },
          {
            accessor: 'code',
            textAlignment: 'center',
            render: (item) => {
              const link = `/admin/invites/${item.id}`
              return (
                <Group spacing={0} position="center">
                  <Anchor component={Link} to={link}>
                    <Code color="brand">{item.code}</Code>
                  </Anchor>
                  <UiCopy text={item?.inviteUrl ?? ''} tooltip="Copy invite URL" />
                </Group>
              )
            },
          },
          {
            title: 'Expires',
            accessor: 'expiresAt',
            textAlignment: 'right',
            render: (item) => {
              return <Text>{item?.expiresAt ? `${new Date(item.expiresAt).toISOString()}` : '∞'}</Text>
            },
          },
          {
            title: 'Uses',
            accessor: 'useCount',
            textAlignment: 'right',
            render: (item) => (
              <Text>{(item?.maxUses ?? 0) > 0 ? `${item.maxUses} / ${item.useCount}` : item.useCount}</Text>
            ),
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} noWrap position="right">
                <ActionIcon component={Link} to={`/admin/invites/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteInvite(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={invites}
      />
    </ScrollArea>
  )
}
