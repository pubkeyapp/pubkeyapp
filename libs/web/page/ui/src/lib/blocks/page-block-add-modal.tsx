import { Button, Group, Modal } from '@mantine/core'
import { AdminUiBlockAddForm } from '@pubkeyapp/web/admin/ui'
import { Page } from '@pubkeyapp/web/util/sdk'
import React, { useState } from 'react'

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
