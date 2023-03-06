import { Box, Paper, Stack, useMantineTheme } from '@mantine/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { AdminPageDomainAddForm } from './admin-page-domain-add.form'
import { AdminPageDomainList } from './admin-page-domain-list'

export function AdminPageDomainsTab({ page }: { page: Page }) {
  const theme = useMantineTheme()
  return (
    <Stack>
      <Paper withBorder radius="md" p={theme.spacing.md}>
        <Stack spacing={theme.spacing.lg}>
          <Box>
            {!page?.domains?.length ? (
              <Box>
                <AdminPageDomainAddForm page={{ ...page }} />
              </Box>
            ) : (
              <AdminPageDomainList page={page} />
            )}
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}
