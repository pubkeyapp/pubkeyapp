import { Box, Flex, Group, Stack, Text } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { User, UserUpdateProfileInput, useUserUpdateProfileMutation } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserSelectAvatarModal } from './user-select-avatar-modal'
import { UserUsernameModal } from './user-username.modal'
import { UserVerifyModal } from './user-verify.modal'

export function UserDashboardProfileCard({ user }: { user: User }) {
  const [, updateProfileMutation] = useUserUpdateProfileMutation()

  const updateProfile = async (input: UserUpdateProfileInput) => {
    return updateProfileMutation({ profileId: `${user.profile?.id}`, input })
      .then((res) => {
        if (res.error) return showNotificationError(res.error.message)
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Profile updated! ')
          return !!res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  return (
    <Flex direction="column" align="center">
      <Stack align="center">
        {user?.profile ? (
          <Stack>
            <UserSelectAvatarModal
              profile={user?.profile}
              identities={user?.profile?.identities ?? user.identities ?? []}
              updateAvatar={(avatarUrl) => {
                return updateProfile({ avatarUrl })
              }}
            />
            <Group position="center">
              <Text size="xl" fw={500}>
                {user?.profile?.name}
              </Text>
            </Group>
          </Stack>
        ) : null}

        <Group spacing={4} align="center">
          <Box w={18} />
          {user.profileUrl ? (
            <Text component={Link} to={user.profileUrl} ff="monospace" color="dimmed">
              {user.username}#{user.pid}
            </Text>
          ) : (
            <Text ff="monospace" color="dimmed">
              {user.username}#{user.pid}
            </Text>
          )}
          <UserUsernameModal user={user} />
          <UserVerifyModal user={user} />
        </Group>
      </Stack>
    </Flex>
  )
}
