import { Button, Paper, useMantineTheme } from '@mantine/core'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminCreateUserInput, UserRole } from '@pubkeyapp/web/util/sdk'

export function userRoleOptions(): { label: string; value: UserRole }[] {
  return Object.keys(UserRole).map((key: string) => ({ label: key, value: UserRole[key as UserRole] }))
}

export function UserFormCreate({
  model,
  submit,
}: {
  model: Partial<AdminCreateUserInput>
  submit: (input: Partial<AdminCreateUserInput>) => Promise<boolean>
}) {
  const theme = useMantineTheme()

  const fields: UiFormField<AdminCreateUserInput>[] = [
    formFieldText('publicKey', {
      label: 'Public Key',
      description: 'The public key of the user to create',
      required: true,
    }),
    formFieldSelect('role', {
      label: 'User role',
      description: 'The role of the user to create',
      options: userRoleOptions(),
    }),
  ]

  return (
    <Paper withBorder radius="md" p={theme.spacing.md}>
      <UiForm<AdminCreateUserInput> fields={fields} model={{ publicKey: '', role: UserRole.User }} submit={submit}>
        <Button type="submit">Create</Button>
      </UiForm>
    </Paper>
  )
}
