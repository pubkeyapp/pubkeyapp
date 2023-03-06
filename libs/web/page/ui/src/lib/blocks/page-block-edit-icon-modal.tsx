import { ActionIcon, Box, Group, Modal, Stack, Tooltip } from '@mantine/core'
import { AdminUpdatePageBlockInput, PageBlock } from '@pubkeyapp/web/util/sdk'
import { IconIcons } from '@tabler//icons-react'
import React, { useState } from 'react'
import { pageBlockIcons } from './page-block-icon'

export function PageBlockEditIconModal({
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
        <Stack>
          <Box>
            <Group>
              {pageBlockIcons.map((icon) => (
                <ActionIcon
                  key={icon.type}
                  color={block.data.icon === icon.type ? 'brand' : 'gray'}
                  onClick={() => submit({ data: { ...block.data, icon: icon.type } })}
                >
                  {icon.icon}
                </ActionIcon>
              ))}
            </Group>
          </Box>
        </Stack>
      </Modal>
      <Tooltip label="Edit icon">
        <ActionIcon color="brand" onClick={() => setOpened(true)}>
          <IconIcons size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
