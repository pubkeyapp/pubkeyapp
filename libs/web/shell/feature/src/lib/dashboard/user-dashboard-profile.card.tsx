import { ActionIcon, Box, Flex, Group, Stack, Text, Tooltip } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { User, UserUpdateUserInput, useUserUpdateUserMutation } from '@pubkeyapp/web/util/sdk'
import { IconPencil } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserSelectAvatarModal } from './user-select-avatar-modal'

export function UserDashboardProfileCard({ user }: { user: User }) {
  const [, updateUserMutation] = useUserUpdateUserMutation()

  const updateUser = async (input: Partial<UserUpdateUserInput>) => {
    return updateUserMutation({ input })
      .then((res) => {
        // refresh()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          window.location.reload()
          return showNotificationSuccess('Profile updated')
        }
        return showNotificationError('Something went wrong')
      })
      .catch((err) => showNotificationError(err.message))
  }
  return (
    <Flex direction="column" align="center">
      <Stack align="center">
        <UserSelectAvatarModal user={user} updateAvatar={(avatarUrl) => updateUser({ avatarUrl })} />
        <Stack>
          <Stack spacing="xs" align="center">
            <Group spacing={4}>
              <Box w={18} />
              <Text size="xl" weight="bold">
                {user.name}
              </Text>
              <Tooltip label="Edit your PubKey Profile">
                <ActionIcon size="xs" variant="subtle" component={Link} to="/settings/profile" color="dimmed">
                  <IconPencil size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Text component={Link} to={`${user.profileUrl}`} color="dimmed" ff="monospace">
              {user.username}#{user.pid}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  )
}
