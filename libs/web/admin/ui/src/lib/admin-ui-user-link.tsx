import { Anchor, Avatar, Group, Text, useMantineTheme } from '@mantine/core'
import { User } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function AdminUiUserLink({ user }: { user: User }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={`/admin/users/${user?.id}`} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Avatar src={user?.avatarUrl} alt={user?.name ?? ''} radius="xl" size={20} />
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {user?.name}
        </Text>
      </Group>
    </Anchor>
  )
}
