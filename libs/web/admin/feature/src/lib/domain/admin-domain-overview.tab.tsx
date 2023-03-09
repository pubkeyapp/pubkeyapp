import { Alert, Paper, Stack, useMantineTheme } from '@mantine/core'
import { AdminUiPageLabel } from '@pubkeyapp/web/admin/ui'
import { Domain } from '@pubkeyapp/web/util/sdk'

export function AdminDomainOverviewTab({ domain }: { domain: Domain }) {
  const theme = useMantineTheme()

  return (
    <Stack>
      <Paper>
        <Stack spacing={theme.spacing.lg}>
          {!domain?.pages?.length ? (
            <Alert color={'brand'}>No pages found.</Alert>
          ) : (
            domain?.pages?.map((page, index) => <AdminUiPageLabel key={`${page?.id}-${index}`} page={page} />)
          )}
        </Stack>
      </Paper>
    </Stack>
  )
}
