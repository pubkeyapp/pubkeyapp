import { Button, Paper } from '@mantine/core'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminUpdateProfileInput, Profile } from '@pubkeyapp/web/util/sdk'

export function AdminProfileSettingsTab({
  profile,
  updateProfile,
}: {
  profile: Profile
  updateProfile: (profile: Partial<AdminUpdateProfileInput>) => Promise<boolean>
}) {
  const fields: UiFormField<AdminUpdateProfileInput>[] = [
    formFieldText('name', { label: 'name' }),
    formFieldText('username', { label: 'username' }),
    formFieldText('avatarUrl', { label: 'avatarUrl' }),
    formFieldTextarea('bio', { label: 'bio' }),
  ]

  return (
    <Paper>
      <UiForm<AdminUpdateProfileInput> fields={fields} model={profile} submit={updateProfile}>
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
