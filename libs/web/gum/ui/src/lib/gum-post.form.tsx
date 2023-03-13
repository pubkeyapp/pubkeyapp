import { Button, Group } from '@mantine/core'
import { formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import React, { useState } from 'react'

export interface GumPostInput {
  metadataUri?: string
  profileAccount?: string
  owner?: string
  userAccount?: string
}

export function GumPostForm({
  model,
  submit,
}: {
  model: GumPostInput
  submit: (input: Partial<GumPostInput>) => Promise<boolean | undefined>
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const fields: UiFormField<GumPostInput>[] = [
    formFieldText('owner', { label: 'Owner', readOnly: true }),
    formFieldText('userAccount', { label: 'User Account', readOnly: true }),
    formFieldText('profileAccount', { label: 'Profile Account', readOnly: true }),
    formFieldText('metadataUri', { label: 'Metadata Uri' }),
  ]
  return (
    <UiForm<GumPostInput>
      fields={fields}
      model={model}
      submit={(value) => {
        setLoading(true)
        return submit(value).finally(() => setLoading(false))
      }}
    >
      <Group position="center">
        <Button loading={loading} type="submit">
          Save
        </Button>
      </Group>
    </UiForm>
  )
}
