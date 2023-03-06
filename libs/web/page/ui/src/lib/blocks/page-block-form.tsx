import { Stack } from '@mantine/core'
import { PageBlockType } from '@pubkeyapp/sdk'
import React from 'react'
import { PageBlockFormHeader, PageBlockHeaderInput } from './page-block-form-header'
import { PageBlockFormLink, PageBlockLinkInput } from './page-block-form-link'

export function PageBlockForm({
  model,
  cancel,
  submit,
  type,
}: {
  model?: PageBlockHeaderInput | PageBlockLinkInput
  cancel: () => void
  submit: (data: PageBlockHeaderInput | PageBlockLinkInput) => Promise<boolean>
  type: PageBlockType
}) {
  return (
    <Stack>
      {type && type === 'Header' ? (
        <PageBlockFormHeader model={model as PageBlockHeaderInput} submit={(data) => submit(data)} cancel={cancel} />
      ) : null}
      {type && type === 'Link' ? (
        <PageBlockFormLink model={model as PageBlockLinkInput} submit={(data) => submit(data)} cancel={cancel} />
      ) : null}
    </Stack>
  )
}
