import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm } from '@pubkeyapp/web/ui/form'
import React from 'react'

export interface EarlyAcceptInviteFormInput {
  code: string
}

export function EarlyAcceptInviteForm({ submit }: { submit: (data: EarlyAcceptInviteFormInput) => Promise<boolean> }) {
  return (
    <UiForm<EarlyAcceptInviteFormInput>
      fields={[
        formFieldText('code', {
          label: 'Code',
          description: 'Enter your invite code here',
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
