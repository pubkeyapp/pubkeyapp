import { Alert } from '@mantine/core'
import { AdminInviteProvider } from '@pubkeyapp/web/invite/data-access'
import {
  showNotificationError,
  showNotificationSuccess,
  UiBackButton,
  UiError,
  UiLoader,
  UiTabRoutes,
} from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminUpdateUserInput, useAdminUpdateUserMutation, useAdminUserQuery } from '@pubkeyapp/web/util/sdk'
import { useParams } from 'react-router-dom'
import { AdminUserIdentitiesTab } from './admin-user-identities.tab'
import { AdminUserInvitesTab } from './admin-user-invites.tab'

import { AdminUserOverviewTab } from './admin-user-overview.tab'
import { AdminUserSettingsTab } from './admin-user-settings.tab'

export function AdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>()
  const [{ data, error, fetching }, refresh] = useAdminUserQuery({ variables: { userId: `${userId}` } })

  const [, updateUserMutation] = useAdminUpdateUserMutation()

  const updateUser = async (invite: AdminUpdateUserInput): Promise<boolean> => {
    return updateUserMutation({
      userId: `${userId}`,
      input: { ...invite },
    })
      .then((res) => {
        refresh()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('User updated')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  if (fetching) {
    return <UiLoader />
  }

  if (error) {
    return <UiError>{error.message}</UiError>
  }

  if (!data?.item) {
    return (
      <UiPage title="User">
        <Alert color={'red'}>User not found</Alert>
      </UiPage>
    )
  }

  return (
    <UiPage title={`${data.item?.username}`} leftAction={<UiBackButton />}>
      <UiTabRoutes
        tabs={[
          { label: 'Overview', value: 'overview', component: <AdminUserOverviewTab user={data.item} /> },
          { label: 'Identities', value: 'identities', component: <AdminUserIdentitiesTab user={data.item} /> },
          {
            label: 'Invites',
            value: 'invites',
            component: (
              <AdminInviteProvider ownerId={data.item.id}>
                <AdminUserInvitesTab />
              </AdminInviteProvider>
            ),
          },
          {
            label: 'Settings',
            value: 'settings',
            component: <AdminUserSettingsTab user={data.item} updateUser={updateUser} />,
          },
        ]}
      />
    </UiPage>
  )
}
