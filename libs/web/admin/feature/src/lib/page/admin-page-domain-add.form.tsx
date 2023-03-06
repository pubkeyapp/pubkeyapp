import { Button, Stack, Text } from '@mantine/core'
import { useAdminDomain, useAdminPage } from '@pubkeyapp/web/admin/data-access'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import {
  AdminAddPageDomainDocument,
  AdminAddPageDomainInput,
  AdminPageDomainDocument,
  Page,
  PageDomain,
} from '@pubkeyapp/web/util/sdk'
import React, { useEffect, useMemo, useState } from 'react'
import { useClient } from 'urql'

export function AdminPageDomainAddForm({ page }: { page: Page }) {
  const client = useClient()

  const { domains, domainOptions } = useAdminDomain()
  const { slugify } = useAdminPage()

  const [checked, setChecked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [found, setFound] = useState<PageDomain | undefined>(undefined)
  const [model, setModel] = useState<AdminAddPageDomainInput>({
    domainId: domainOptions?.length ? domainOptions[0].value : '',
    path: slugify(page.title!),
  })

  useEffect(() => {
    if (checked || found) return
    checkPageDomain(model)
  }, [checked, found, domains, domainOptions, model])

  const checkPageDomain = async (input: Partial<AdminAddPageDomainInput>): Promise<boolean> => {
    setChecked(false)
    setFound(undefined)
    setLoading(true)
    setModel(input as AdminAddPageDomainInput)
    return client
      .query(AdminPageDomainDocument, { domainId: input.domainId, path: input.path })
      .toPromise()
      .then((adminPageDomain) => {
        setChecked(true)
        setFound(adminPageDomain.data?.item)
        setLoading(false)

        return !!adminPageDomain.data?.item
      })
  }

  const addPageDomain = async (input: Partial<AdminAddPageDomainInput>): Promise<boolean> => {
    setLoading(true)
    return client
      .mutation(AdminAddPageDomainDocument, { pageId: page.id, input: input })
      .toPromise()
      .then((adminAddPageDomain) => {
        const found = !!adminAddPageDomain.data?.item
        setLoading(false)
        return found
      })
  }

  const fields: UiFormField<AdminAddPageDomainInput>[] = useMemo(
    () => [
      formFieldSelect('domainId', {
        label: 'Domain',
        description: 'Select the domain.',
        options: domainOptions ?? [],
        required: true,
      }),
      formFieldText('path', {
        label: 'Path',
        description: 'The path of the page.',
        required: true,
      }),
    ],
    [domainOptions],
  )

  const canCreate = useMemo(() => !loading && !found?.id && checked, [loading, found, checked])
  const domain = domains?.find((domain) => domain.id === model.domainId)

  if (!domainOptions?.length) return null

  return (
    <Stack>
      <UiForm<AdminAddPageDomainInput> fields={fields} model={model} submit={checkPageDomain}>
        <Button loading={loading} type="submit">
          Check
        </Button>
      </UiForm>
      {found ? <UiDebug data={{ found }} open /> : null}
      {canCreate ? (
        <Stack align="center" spacing="xl" mt="xl">
          <Text size={24} sx={{ lineHeight: 1 }}>
            Your domain path is available!
          </Text>
          <Text weight={500} size={36} sx={{ lineHeight: 1 }} my={24}>
            {domain?.name}/{model.path}
          </Text>
          <Button loading={loading} size="xl" disabled={!canCreate} onClick={() => addPageDomain(model)} color="green">
            Add Domain
          </Button>
        </Stack>
      ) : null}
    </Stack>
  )
}
