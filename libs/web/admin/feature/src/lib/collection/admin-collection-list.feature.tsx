import { ActionIcon, Alert, Stack } from '@mantine/core'
import { AdminUiCollectionTable } from '@pubkeyapp/web/admin/ui'
import { UiActionLink, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import { UiPage } from '@pubkeyapp/web/ui/page'
import {
  AdminGetCollectionsInput,
  useAdminDeleteCollectionMutation,
  useAdminGetCollectionsQuery,
} from '@pubkeyapp/web/util/sdk'
import { IconColumns3, IconPlus } from '@tabler/icons-react'
import React, { useState } from 'react'

export function AdminCollectionListFeature() {
  const [input, setInput] = useState<AdminGetCollectionsInput>({})
  const [{ data, error, fetching }, refresh] = useAdminGetCollectionsQuery({ variables: { input } })
  const [, deleteCollectionMutation] = useAdminDeleteCollectionMutation()

  function deleteCollection(collectionId: string) {
    deleteCollectionMutation({ collectionId })
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
        title="Collections"
        leftAction={
          <ActionIcon>
            <IconColumns3 />
          </ActionIcon>
        }
        rightAction={<UiActionLink to="create" label="Create collection" icon={<IconPlus size={16} stroke={1.5} />} />}
      >
        <Stack>
          {data?.items?.length ? (
            <AdminUiCollectionTable collections={data?.items ?? []} deleteCollection={deleteCollection} />
          ) : (
            <Alert>No collections found</Alert>
          )}
        </Stack>
      </UiPage>
    </UiErrorLoader>
  )
}
