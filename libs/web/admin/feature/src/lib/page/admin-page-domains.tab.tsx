import { Alert, Box, Paper, Stack } from '@mantine/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { AdminPageDomainAddForm } from './admin-page-domain-add.form'
import { AdminPageDomainList } from './admin-page-domain-list'

export function AdminPageDomainsTab({ page }: { page: Page }) {
  return (
    <Paper>
      <Stack spacing="xl">
        {!page?.domains?.length ? (
          <Alert>No domains connected to this page.</Alert>
        ) : (
          <AdminPageDomainList page={page} />
        )}
        <AdminPageDomainAddForm page={{ ...page }} />
      </Stack>
    </Paper>
  )
}
