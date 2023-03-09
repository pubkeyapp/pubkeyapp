import { Paper, Stack, useMantineTheme } from '@mantine/core'
import { AdminUiUserLink } from '@pubkeyapp/web/admin/ui'
import { UiPageHeaderTitle } from '@pubkeyapp/web/ui/page'
import { Profile } from '@pubkeyapp/web/util/sdk'

export function AdminProfileOverviewTab({ profile }: { profile: Profile }) {
  const theme = useMantineTheme()

  return (
    <Stack>
      <Paper>
        <Stack spacing={theme.spacing.lg}>
          <UiPageHeaderTitle title="Profiler" />
          {profile.owner ? <AdminUiUserLink user={profile.owner} /> : null}
          <UiPageHeaderTitle title="Expires" />
          {profile?.owner ? <AdminUiUserLink user={profile?.owner} /> : 'No profile owner found'}
        </Stack>
      </Paper>
    </Stack>
  )
}
