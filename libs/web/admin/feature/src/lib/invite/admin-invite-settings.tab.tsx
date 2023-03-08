import { Button, Paper, useMantineTheme } from '@mantine/core'
import { formFieldDate, formFieldNumber, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import { AdminUpdateInviteInput, Invite } from '@pubkeyapp/web/util/sdk'

export function AdminInviteSettingsTab({
  invite,
  updateInvite,
}: {
  invite: Invite
  updateInvite: (invite: Partial<AdminUpdateInviteInput>) => Promise<boolean>
}) {
  const theme = useMantineTheme()

  const fields: UiFormField<AdminUpdateInviteInput>[] = [
    formFieldNumber('maxUses', {
      label: 'Maximum uses',
      description: 'Set the maximum number of times this invite can be used. Set to zero for unlimited.',
    }),
    formFieldDate('expiresAt', {
      label: 'Invite expiration',
      description: 'Set the date this invite expires. Leave blank for no expiration.',
      minDate: new Date(),
    }),
  ]

  return (
    <Paper>
      <UiForm<AdminUpdateInviteInput>
        fields={fields}
        model={{
          maxUses: invite.maxUses ?? 0,
          expiresAt: invite.expiresAt ?? '',
        }}
        submit={updateInvite}
      >
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
