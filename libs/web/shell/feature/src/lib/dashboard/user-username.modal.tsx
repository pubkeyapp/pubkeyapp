import { ActionIcon, Button, Group, Modal, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { PubKeyProfileBadge, showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { User, UserUpdateUserInput, useUserUpdateUserMutation } from '@pubkeyapp/web/util/sdk'
import { IconPencil } from '@tabler/icons-react'
import React from 'react'

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
            <PubKeyProfileBadge label="PubKey Settings" user={user} />
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
