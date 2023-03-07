import { Button, Paper, useMantineTheme } from '@mantine/core'
import { formFieldSelect, formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
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
  const theme = useMantineTheme()

  const fields: UiFormField<AdminUpdateUserInput>[] = [
    formFieldSelect('role', { label: 'Role', options: userRoleOptions() }),
    formFieldSelect('status', { label: 'Status', options: userStatusOptions() }),
    formFieldText('username', { label: 'Username', required: true }),
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
    formFieldTextarea('bio', { label: 'Bio' }),
  ]

  return (
    <Paper withBorder radius="md" p={theme.spacing.md}>
      <UiForm<AdminUpdateUserInput> fields={fields} model={{ ...user, bio: user.bio ?? '' }} submit={updateUser}>
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
