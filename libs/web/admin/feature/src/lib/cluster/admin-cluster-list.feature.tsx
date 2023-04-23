import { ActionIcon, Alert, Stack } from '@mantine/core'
import { AdminUiClusterTable } from '@pubkeyapp/web/admin/ui'
import { UiActionLink, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import { UiPage } from '@pubkeyapp/web/ui/page'
import {
  AdminGetClustersInput,
  useAdminDeleteClusterMutation,
  useAdminGetClustersQuery,
} from '@pubkeyapp/web/util/sdk'
import { IconColumns3, IconPlus } from '@tabler/icons-react'
import React, { useState } from 'react'

export function AdminClusterListFeature() {
  const [input, setInput] = useState<AdminGetClustersInput>({})
  const [{ data, error, fetching }, refresh] = useAdminGetClustersQuery({ variables: { input } })
  const [, deleteClusterMutation] = useAdminDeleteClusterMutation()

  function deleteCluster(clusterId: string) {
    deleteClusterMutation({ clusterId })
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
        title="Clusters"
        leftAction={
          <ActionIcon>
            <IconColumns3 />
          </ActionIcon>
        }
        rightAction={<UiActionLink to="create" label="Create cluster" icon={<IconPlus size={16} stroke={1.5} />} />}
      >
        <Stack>
          {data?.items?.length ? (
            <AdminUiClusterTable clusters={data?.items ?? []} deleteCluster={deleteCluster} />
          ) : (
            <Alert>No clusters found</Alert>
          )}
        </Stack>
      </UiPage>
    </UiErrorLoader>
  )
}
