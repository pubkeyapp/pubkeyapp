import { Alert, Box, Button, Group, Modal, Paper, Stack, useMantineTheme } from '@mantine/core'
import { useAdminPage } from '@pubkeyapp/web/admin/data-access'
import { AdminUiBlockAddForm } from '@pubkeyapp/web/admin/ui'
import { PageColorSelect } from '@pubkeyapp/web/page/ui'
import { Page } from '@pubkeyapp/web/util/sdk'
import React, { useState } from 'react'
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

export function PageBlockAddModal({ page }: { page: Page }) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Block" centered>
        <AdminUiBlockAddForm page={page} />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Add Block</Button>
      </Group>
    </>
  )
}
