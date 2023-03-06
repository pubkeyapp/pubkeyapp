import { Alert } from '@mantine/core'
import { useAdminInvite } from '@pubkeyapp/web/invite/data-access'
import { UiBackButton, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { Invite, useAdminInviteQuery } from '@pubkeyapp/web/util/sdk'
import { useParams } from 'react-router-dom'

import { AdminInviteOverviewTab } from './admin-invite-overview.tab'
import { AdminInviteSettingsTab } from './admin-invite-settings.tab'

export function AdminInviteDetailFeature() {
  const { inviteId } = useParams<{ inviteId: string }>()
  const { updateInvite } = useAdminInvite()
  const [{ data, error, fetching }] = useAdminInviteQuery({ variables: { inviteId: inviteId as string } })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      {data?.item ? (
        <UiPage title={`${data.item?.code}`} leftAction={<UiBackButton />}>
          <UiTabRoutes
            tabs={[
              { label: 'Overview', value: 'overview', component: <AdminInviteOverviewTab invite={data.item} /> },
              {
                label: 'Settings',
                value: 'settings',
                component: (
                  <AdminInviteSettingsTab
                    invite={data.item}
                    updateInvite={(input) => updateInvite(data?.item as Invite, input)}
                  />
                ),
              },
            ]}
          />
        </UiPage>
      ) : (
        <UiPage title="Invite">
          <Alert color={'red'}>Invite not found</Alert>
        </UiPage>
      )}
    </UiErrorLoader>
  )
}
