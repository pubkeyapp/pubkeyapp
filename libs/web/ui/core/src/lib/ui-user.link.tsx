import { Anchor, Avatar, Group, Text, useMantineTheme } from '@mantine/core'
import { User } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function UiUserLink({ user }: { user: User }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={user?.profileUrl ?? ''} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Avatar src={user?.profile?.avatarUrl} alt={user?.username ?? ''} radius="xl" size={20} />
        <Text>{user?.username}</Text>
      </Group>
    </Anchor>
  )
}
