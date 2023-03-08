import { Button, Paper } from '@mantine/core'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { User, UserUpdateUserInput } from '@pubkeyapp/web/util/sdk'

export function SettingsUserForm({
  user,
  updateUser,
}: {
  user: User
  updateUser: (user: Partial<UserUpdateUserInput>) => Promise<boolean | undefined>
}) {
  const fields: UiFormField<UserUpdateUserInput>[] = [
    formFieldText('username', { label: 'Username' }),
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
    formFieldTextarea('bio', { label: 'Bio' }),
  ]

  return (
    <Paper>
      <UiForm<UserUpdateUserInput> fields={fields} model={{ ...user, bio: user.bio ?? '' }} submit={updateUser}>
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
