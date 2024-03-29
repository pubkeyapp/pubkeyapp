import { Button, Group, Modal, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'

import { formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import { User, UserUpdateUserInput, useUserUpdateUserMutation } from '@pubkeyapp/web/util/sdk'
import { UserProfileBadge } from './user-profile-badge'

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
        title={<Group>{<UserProfileBadge label="PubKey Settings" user={user} />}</Group>}
        centered
        size="lg"
      >
        <UserUsernameForm user={user} updateUser={updateUser} />
      </Modal>

      <Tooltip label="Edit your PubKey Username">
        <Group>
          <UserProfileBadge user={user} onClick={open} />
        </Group>
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
