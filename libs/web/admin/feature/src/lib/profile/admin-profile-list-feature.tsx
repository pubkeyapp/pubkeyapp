import { Alert } from '@mantine/core'

import { ProfileTable } from '@pubkeyapp/web/profile/ui'
import { UiActionLink, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { IconCards, IconPlus } from '@tabler//icons-react'
import { useAdminProfile } from './admin-profile-provider'

export function AdminProfileListFeature() {
  const { deleteProfile, error, profiles, loading } = useAdminProfile()

  return (
    <UiErrorLoader error={error} loading={loading}>
      <UiPage
        title="Profiles"
        leftAction={<IconCards />}
        rightAction={<UiActionLink to="create" label="Create profile" icon={<IconPlus size={16} stroke={1.5} />} />}
      >
        {profiles?.length ? (
          <ProfileTable profiles={profiles} deleteProfile={deleteProfile} />
        ) : (
          <Alert>No profiles found</Alert>
        )}
      </UiPage>
    </UiErrorLoader>
  )
}
