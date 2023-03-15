import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm } from '@pubkeyapp/web/ui/form'

export interface EarlyAcceptInviteFormInput {
  code: string
}

export function EarlyAcceptInviteForm({ submit }: { submit: (data: EarlyAcceptInviteFormInput) => Promise<boolean> }) {
  return (
    <UiForm<EarlyAcceptInviteFormInput>
      fields={[
        formFieldText('code', {
          placeholder: 'Enter invite code here',
          required: true,
        }),
      ]}
      model={{ code: '' }}
      submit={(data) => submit(data as EarlyAcceptInviteFormInput)}
    >
      <Group position="center">
        <Button type="submit">Accept Invite</Button>
      </Group>
    </UiForm>
  )
}
