import { ActionIcon, Alert, Box, Stack } from '@mantine/core'
import { AdminUiSettingsTable } from '@pubkeyapp/web/admin/ui'
import { showNotificationError, showNotificationSuccess, UiDebug, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { useAdminGetSettingsQuery, useAdminSetSettingMutation } from '@pubkeyapp/web/util/sdk'
import { IconSettings } from '@tabler//icons-react'
import React from 'react'

export function AdminSettingsListFeature() {
  const [{ data, error, fetching }] = useAdminGetSettingsQuery()
  const [, setSettingsMutation] = useAdminSetSettingMutation()

  const setSettings = async (key: string, value: string) => {
    setSettingsMutation({ key, value })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Setting updated')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }
  return (
    <UiErrorLoader error={error} loading={fetching}>
      <UiPage
        title="Settings"
        leftAction={
          <ActionIcon>
            <IconSettings />
          </ActionIcon>
        }
      >
        <Stack>
          <Box>
            {data?.items?.length ? (
              <AdminUiSettingsTable settings={data?.items} setSettings={setSettings} />
            ) : (
              <Alert>No accounts found</Alert>
            )}
          </Box>
          <UiDebug data={{ data }} />
        </Stack>
      </UiPage>
    </UiErrorLoader>
  )
}
