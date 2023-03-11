import { Button, Paper } from '@mantine/core'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminUpdateUserInput, User, UserRole, UserStatus } from '@pubkeyapp/web/util/sdk'

export function userRoleOptions(): { label: string; value: UserRole }[] {
  return Object.keys(UserRole).map((key: string) => ({ label: key, value: UserRole[key as UserRole] }))
}

export function userStatusOptions(): { label: string; value: UserStatus }[] {
  return Object.keys(UserStatus).map((key: string) => ({ label: key, value: UserStatus[key as UserStatus] }))
}

export function AdminUserSettingsTab({
  user,
  updateUser,
}: {
  user: User
  updateUser: (user: Partial<AdminUpdateUserInput>) => Promise<boolean>
}) {
  const fields: UiFormField<AdminUpdateUserInput>[] = [
    formFieldSelect('role', { label: 'Role', options: userRoleOptions() }),
    formFieldSelect('status', { label: 'Status', options: userStatusOptions() }),
    formFieldText('username', { label: 'Username', required: true }),
  ]

  return (
    <Paper>
      <UiForm<AdminUpdateUserInput> fields={fields} model={{ ...user }} submit={updateUser}>
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
