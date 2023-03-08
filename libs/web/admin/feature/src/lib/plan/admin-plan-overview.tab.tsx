import { Paper, Stack, useMantineTheme } from '@mantine/core'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { UiPageHeaderTitle } from '@pubkeyapp/web/ui/page'
import { Plan } from '@pubkeyapp/web/util/sdk'

export function AdminPlanOverviewTab({ plan }: { plan: Plan }) {
  const theme = useMantineTheme()

  return (
    <Stack>
      <Paper>
        <Stack spacing={theme.spacing.lg}>
          <UiPageHeaderTitle title="Plans" />
          <UiDebug data={plan} />
        </Stack>
      </Paper>
    </Stack>
  )
}
