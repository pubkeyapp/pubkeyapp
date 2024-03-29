import { ActionIcon, Modal, Tooltip } from '@mantine/core'
import { AdminUpdatePageBlockInput, PageBlock, PageBlockType } from '@pubkeyapp/web/util/sdk'
import { IconPencil } from '@tabler/icons-react'
import React, { useState } from 'react'
import { PageBlockForm } from './page-block-form'

export function PageBlockEditModal({
  block,
  submit,
}: {
  block: PageBlock
  submit: (input: AdminUpdatePageBlockInput) => Promise<boolean>
}) {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={`Edit ${block.type}`} centered>
        <PageBlockForm
          model={{ ...block.data } as any}
          type={block.type as PageBlockType}
          submit={(data) => submit({ data: { ...block.data, ...data }, type: block.type as PageBlockType })}
          cancel={() => setOpened(false)}
        />
      </Modal>
      <Tooltip label="Edit block">
        <ActionIcon color="brand" onClick={() => setOpened(true)}>
          <IconPencil size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
