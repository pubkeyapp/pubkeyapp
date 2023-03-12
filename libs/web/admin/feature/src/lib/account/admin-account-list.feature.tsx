import { ActionIcon, Alert, Stack } from '@mantine/core'
import { AdminUiAccountTable } from '@pubkeyapp/web/admin/ui'
import { showNotificationError, showNotificationSuccess, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminGetAccountsInput, useAdminDeleteAccountMutation, useAdminGetAccountsQuery } from '@pubkeyapp/web/util/sdk'
import { IconNotes } from '@tabler/icons-react'
import React, { useState } from 'react'

export function AdminAccountListFeature() {
  const [input, setInput] = useState<AdminGetAccountsInput>({})
  const [{ data, error, fetching }, refresh] = useAdminGetAccountsQuery({ variables: { input } })
  const [, deleteAccountMutation] = useAdminDeleteAccountMutation()

  function deleteAccount(accountId: string) {
    deleteAccountMutation({ accountId })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
      .finally(refresh)
  }
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
            <AdminUiAccountTable accounts={data?.items ?? []} deleteAccount={deleteAccount} />
          ) : (
            <Alert>No accounts found</Alert>
          )}
        </Stack>
      </UiPage>
    </UiErrorLoader>
  )
}
