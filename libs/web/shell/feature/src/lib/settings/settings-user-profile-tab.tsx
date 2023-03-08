import { Container, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { UserUpdateUserInput, useUserUpdateUserMutation } from '@pubkeyapp/web/util/sdk'
import { SettingsUserForm } from './settings-user-profile-form'

export function SettingsUserProfileTab() {
  const { user, refresh } = useAuth()
  const [, updateUserMutation] = useUserUpdateUserMutation()

  const updateUser = async (input: Partial<UserUpdateUserInput>) => {
    return updateUserMutation({ input })
      .then((res) => {
        refresh()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          window.location.reload()
          return showNotificationSuccess('Profile updated')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }

  if (!user) return null
  return (
    <Container size="md">
      <Stack>
        <SettingsUserForm user={user} updateUser={updateUser} />
      </Stack>
    </Container>
  )
}
