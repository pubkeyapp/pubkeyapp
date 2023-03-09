import { Alert } from '@mantine/core'

import { UiBackButton, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { Profile, useAdminProfileQuery } from '@pubkeyapp/web/util/sdk'
import { useParams } from 'react-router-dom'

import { AdminProfileOverviewTab } from './admin-profile-overview.tab'
import { useAdminProfile } from './admin-profile-provider'
import { AdminProfileSettingsTab } from './admin-profile-settings.tab'

export function AdminProfileDetailFeature() {
  const { profileId } = useParams<{ profileId: string }>()
  const { updateProfile } = useAdminProfile()
  const [{ data, error, fetching }] = useAdminProfileQuery({ variables: { profileId: profileId as string } })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      {data?.item ? (
        <UiPage title={`${data.item?.type}`} leftAction={<UiBackButton />}>
          <UiTabRoutes
            tabs={[
              { label: 'Overview', value: 'overview', component: <AdminProfileOverviewTab profile={data.item} /> },
              {
                label: 'Settings',
                value: 'settings',
                component: (
                  <AdminProfileSettingsTab
                    profile={data.item}
                    updateProfile={(input) => updateProfile(data?.item as Profile, input)}
                  />
                ),
              },
            ]}
          />
        </UiPage>
      ) : (
        <UiPage title="Profile">
          <Alert color={'red'}>Profile not found</Alert>
        </UiPage>
      )}
    </UiErrorLoader>
  )
}
