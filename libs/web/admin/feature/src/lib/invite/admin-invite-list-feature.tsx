import { Alert } from '@mantine/core'
import { useAdminInvite } from '@pubkeyapp/web/invite/data-access'
import { InviteTable } from '@pubkeyapp/web/invite/ui'
import { UiActionLink, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { IconCards, IconPlus } from '@tabler/icons-react'

export function AdminInviteListFeature() {
  const { deleteInvite, error, invites, loading } = useAdminInvite()

  return (
    <UiErrorLoader error={error} loading={loading}>
      <UiPage
        title="Invites"
        leftAction={<IconCards />}
        rightAction={<UiActionLink to="create" label="Create invite" icon={<IconPlus size={16} stroke={1.5} />} />}
      >
        {invites?.length ? (
          <InviteTable invites={invites} deleteInvite={deleteInvite} />
        ) : (
          <Alert>No invites found</Alert>
        )}
      </UiPage>
    </UiErrorLoader>
  )
}
