import { Anchor, Avatar, Group, Text, useMantineTheme } from '@mantine/core'
import { Profile, User } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function UiUserLink({ user, to }: { user: User; to?: string }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={to ?? user?.profileUrl ?? ''} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Avatar src={user?.profile?.avatarUrl} alt={user?.username ?? ''} radius="xl" size={20} />
        <Text>{user?.username}</Text>
      </Group>
    </Anchor>
  )
}

export function UiProfileLink({ profile, to }: { profile: Profile; to?: string }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={to ?? ''} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Avatar src={profile?.avatarUrl} alt={profile?.username ?? ''} radius="xl" size={20} />
        <Text>{profile?.username}</Text>
      </Group>
    </Anchor>
  )
}
