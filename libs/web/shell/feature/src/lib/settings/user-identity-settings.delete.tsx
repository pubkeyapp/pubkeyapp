import { Stack } from '@mantine/core'
import { showNotificationError, showNotificationSuccess, UiButton } from '@pubkeyapp/web/ui/core'
import { Identity, useUserDeleteIdentityMutation } from '@pubkeyapp/web/util/sdk'
import { IconRefresh } from '@tabler/icons-react'
import React from 'react'

export function UserIdentitySettingsDelete({ identity }: { identity: Identity }) {
  const [{ fetching, error, data }, syncIdentityMutation] = useUserDeleteIdentityMutation()

  function syncIdentity(identityId: string) {
    return syncIdentityMutation({ identityId })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Stack spacing={36}>
      <UiButton
        loading={fetching}
        label="Delete Identity"
        onClick={() => syncIdentity(identity.id!)}
        icon={IconRefresh}
      />
    </Stack>
  )
}
