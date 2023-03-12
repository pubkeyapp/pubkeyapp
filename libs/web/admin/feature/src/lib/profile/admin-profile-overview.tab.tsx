import { Paper, Stack, useMantineTheme } from '@mantine/core'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { Profile } from '@pubkeyapp/web/util/sdk'

export function AdminProfileOverviewTab({ profile }: { profile: Profile }) {
  const theme = useMantineTheme()

  return (
    <Stack>
      <Paper>
        <Stack spacing={theme.spacing.lg}>
          <UiDebug data={profile} open />
        </Stack>
      </Paper>
    </Stack>
  )
}
