import { Alert, Paper, Stack, useMantineTheme } from '@mantine/core'
import { AdminUiPageLink } from '@pubkeyapp/web/admin/ui'
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
            domain?.pages?.map((page) => <AdminUiPageLink key={page.id} page={page} />)
          )}
        </Stack>
      </Paper>
    </Stack>
  )
}
