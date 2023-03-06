import { Alert } from '@mantine/core'
import { useAdminInvite } from '@pubkeyapp/web/invite/data-access'
import { InviteTable } from '@pubkeyapp/web/invite/ui'
import { UiErrorLoader } from '@pubkeyapp/web/ui/core'

export function AdminUserInvitesTab() {
  const { error, deleteInvite, invites, loading } = useAdminInvite()

  return (
    <UiErrorLoader error={error} loading={loading}>
      {invites?.length ? (
        <InviteTable invites={invites} deleteInvite={deleteInvite} />
      ) : (
        <Alert>No invites found</Alert>
      )}
    </UiErrorLoader>
  )
}
