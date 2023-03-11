import { Anchor, Avatar, Group, Text, useMantineTheme } from '@mantine/core'
import { Profile, User } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'

export function AdminUiUserLink({ user }: { user: User }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={`/admin/users/${user?.id}`} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Avatar src={user?.profile?.avatarUrl} alt={user?.username ?? ''} radius="xl" size={20} />
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {user?.username}
        </Text>
      </Group>
    </Anchor>
  )
}

export function AdminUiProfileLink({ profile }: { profile: Profile }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={`/admin/profiles/${profile?.id}`} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Avatar src={profile.avatarUrl} alt={profile?.name ?? ''} radius="xl" size={20} />
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {profile?.name ?? profile?.username}
        </Text>
      </Group>
    </Anchor>
  )
}
