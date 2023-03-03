import { ActionIcon, Avatar, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { User } from '../data-access'
import { UserRoleBadge } from './user-role-badge'

interface AdminUserTableProps {
  users: User[]
  deleteUser: (user: User) => void
}

export function UserTable({ deleteUser, users }: AdminUserTableProps) {
  return (
    <ScrollArea>
      <DataTable<User>
        borderRadius="md"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            render: (item) => {
              const link = `/admin/users/${item.id}`
              return (
                <Group spacing="sm" p={4}>
                  <Avatar component={Link} to={link} size={40} src={item.avatarUrl} radius={50} />
                  <Stack spacing={1}>
                    <Text component={Link} to={link} size="sm" weight={500} color="brand">
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {item.username}
                    </Text>
                  </Stack>
                </Group>
              )
            },
          },
          { accessor: 'email' },
          { accessor: 'role', render: (item) => <UserRoleBadge role={item.role} /> },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
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
