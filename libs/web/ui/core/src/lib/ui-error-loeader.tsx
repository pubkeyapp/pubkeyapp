import { Anchor, Avatar, Center, Group, Text, useMantineTheme } from '@mantine/core'
import { User } from '@pubkeyapp/web/util/sdk'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { UiError } from './ui-error'
import { UiLoader } from './ui-loader'

export function UiErrorLoader({
  children,
  error,
  loading,
}: {
  children: ReactNode
  error?: unknown
  loading?: boolean
}) {
  if (loading) {
    return (
      <Center h="100%">
        <UiLoader />
      </Center>
    )
  }
  if (error) {
    return (
      <Center h="100%">
        <UiError error={error} />
      </Center>
    )
  }
  return <>{children}</>
}

export function UiUserLink({ user }: { user: User }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={user?.profileUrl ?? ''} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Avatar src={user?.avatarUrl} alt={user?.name ?? ''} radius="xl" size={20} />
        <Text>{user?.name}</Text>
      </Group>
    </Anchor>
  )
}
