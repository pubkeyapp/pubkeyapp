import {
  ActionIcon,
  Anchor,
  Badge,
  BadgeProps,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import {
  User,
  UserUpdateProfileInput,
  UserUpdateUserInput,
  useUserUpdateProfileMutation,
  useUserUpdateUserMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconPencil } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserSelectAvatarModal } from './user-select-avatar-modal'

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
        ) : (
          <div>no profile</div>
        )}

        <Group spacing={4}>
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
        </Group>
      </Stack>
    </Flex>
  )
}
export function UserUsernameModal({ user }: { user: User }) {
  const [opened, { open, close }] = useDisclosure(false)
  const [, updateUserMutation] = useUserUpdateUserMutation()
  function updateUser(input: UserUpdateUserInput) {
    return updateUserMutation({ input })
      .then((res) => {
        modals.closeAll()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group>
            <PubKeyProfileBadge user={user} />
            <Text size="lg">PubKey Settings</Text>
          </Group>
        }
        centered
        size="lg"
      >
        <UserUsernameForm user={user} updateUser={updateUser} />
      </Modal>

      <Tooltip label="Edit your PubKey Username">
        <ActionIcon size="xs" variant="subtle" onClick={open} color="dimmed">
          <IconPencil size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export function UserUsernameForm({
  user,
  updateUser,
}: {
  user: User
  updateUser: (user: Partial<UserUpdateUserInput>) => Promise<boolean | undefined>
}) {
  const fields: UiFormField<UserUpdateUserInput>[] = [formFieldText('username', { required: true })]

  return (
    <UiForm<UserUpdateUserInput> fields={fields} model={{ ...user }} submit={updateUser}>
      <Button type="submit">Save</Button>
    </UiForm>
  )
}

export interface PubKeyProfileBadgeProps extends BadgeProps {
  component?: any
  user?: User
  onClick?: () => void
}

export function PubKeyProfileBadge({ component, user, ...props }: PubKeyProfileBadgeProps) {
  return (
    <Tooltip label={`PubKey Profile: ${user?.username}#${user?.pid}`} position="right" withArrow>
      <Badge
        {...props}
        onClick={props.onClick}
        color="brand"
        size="lg"
        pl={0}
        leftSection={
          <Box w={32} h={32} pt={4} pl={0}>
            <PubKeyLogoRounded size={24} style={{ borderRadius: 50 }} />
          </Box>
        }
      >
        {user?.username}#{user?.pid}
      </Badge>
    </Tooltip>
  )
}
