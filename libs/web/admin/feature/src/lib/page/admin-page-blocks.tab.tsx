import { Alert, Box, Group, Paper, Stack, useMantineTheme } from '@mantine/core'
import { useAdminPage } from '@pubkeyapp/web/admin/data-access'
import { PageBlockAddModal, PageColorSelect } from '@pubkeyapp/web/page/ui'
import { Page } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { AdminPageBlockList } from './admin-page-block-list'

export function AdminPageBlocksTab({ page }: { page: Page }) {
  const theme = useMantineTheme()
  const { updatePage } = useAdminPage()
  return (
    <Paper>
      <Stack>
        <Group>
          <PageBlockAddModal page={page} />
          <PageColorSelect selected={page.color!} selectColor={(color) => updatePage(page, { color })} />
        </Group>

        <Stack spacing={theme.spacing.lg}>
          <Box>
            {!page?.blocks?.length ? (
              <Alert color={'brand'}>No blocks found.</Alert>
            ) : (
              <AdminPageBlockList page={page} />
            )}
          </Box>
        </Stack>
      </Stack>
    </Paper>
  )
}
