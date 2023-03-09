import { ActionIcon, Alert, Stack } from '@mantine/core'
import { AdminUiAccountTable } from '@pubkeyapp/web/admin/ui'
import { UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminListAccountInput, useAdminAccountsQuery } from '@pubkeyapp/web/util/sdk'
import { IconNotes } from '@tabler/icons-react'
import React, { useState } from 'react'

export function AdminAccountListFeature() {
  const [input, setInput] = useState<AdminListAccountInput>({})
  const [{ data, error, fetching }] = useAdminAccountsQuery({ variables: { input } })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      <UiPage
        title="Accounts"
        leftAction={
          <ActionIcon>
            <IconNotes />
          </ActionIcon>
        }
      >
        <Stack>
          {data?.items?.length ? (
            <AdminUiAccountTable accounts={data?.items ?? []} />
          ) : (
            <Alert>No accounts found</Alert>
          )}
        </Stack>
      </UiPage>
    </UiErrorLoader>
  )
}
