import { Button, Paper } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { User, UserUpdateUserInput } from '@pubkeyapp/web/util/sdk'

export function SettingsUserForm({
  user,
  updateUser,
}: {
  user: User
  updateUser: (user: Partial<UserUpdateUserInput>) => Promise<boolean | undefined>
}) {
  const fields: UiFormField<UserUpdateUserInput>[] = [
    //
    formFieldText('username', { label: 'Username' }),
  ]

  return (
    <Paper>
      <UiForm<UserUpdateUserInput> fields={fields} model={{ ...user }} submit={updateUser}>
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
