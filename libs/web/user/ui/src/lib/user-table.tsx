import { ActionIcon, Avatar, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { User, UserRole, UserStatus } from '@pubkeyapp/web/util/sdk'
import { IconPencil, IconTrash, IconUser } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { UserRoleBadge } from './user-role-badge'
import { UserStatusBadge } from './user-status-badge'

interface AdminUserTableProps {
  users: User[]
  deleteUser: (user: User) => void
}

export function UserTable({ deleteUser, users }: AdminUserTableProps) {
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
            accessor: 'username',
            render: (item) => {
              const link = `/admin/users/${item.id}`
              return (
                <Group spacing="sm" p={4}>
                  <Avatar component={Link} to={link} size={40} src={item?.profile?.avatarUrl} radius={50} />
                  <Stack spacing={1}>
                    <Text component={Link} to={link} size="sm" weight={500} color="brand">
                      {item.username}
                    </Text>
                    <Text component={Link} to={'/account/' + item.publicKey} size="xs" color="dimmed">
                      {item.publicKey ?? 'No public key'}
                    </Text>
                  </Stack>
                </Group>
              )
            },
          },
          { accessor: 'pid', textAlignment: 'center' },
          {
            accessor: 'role',
            textAlignment: 'center',
            render: (item) => <UserRoleBadge role={item.role as UserRole} />,
          },
          {
            accessor: 'status',
            textAlignment: 'center',
            render: (item) => <UserStatusBadge status={item.status as UserStatus} />,
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon component={Link} to={`${item.profileUrl}`}>
                  <IconUser size={16} />
                </ActionIcon>
                <ActionIcon component={Link} to={`/admin/users/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteUser(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={users}
      />
    </ScrollArea>
  )
}
