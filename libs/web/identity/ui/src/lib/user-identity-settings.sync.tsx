import { Stack } from '@mantine/core'
import { UiButton, UiDebug } from '@pubkeyapp/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import { Identity, useUserSyncIdentityMutation } from '@pubkeyapp/web/util/sdk'
import { IconRefresh } from '@tabler/icons-react'

export function UserIdentitySettingsSync({ identity }: { identity: Identity }) {
  const [{ fetching: loading, error, data }, syncIdentityMutation] = useUserSyncIdentityMutation()

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
      <UiDebug data={{ identity }} />
      <UiDebug data={{ loading, data, error }} open />
      <UiButton loading={loading} label="Sync Identity" onClick={() => syncIdentity(identity.id!)} icon={IconRefresh} />
    </Stack>
  )
}
