import { ActionIcon, Box, Group, Modal, Paper, Text, Tooltip, UnstyledButton, useMantineTheme } from '@mantine/core'
import { IconBug, IconEye, IconEyeOff } from '@tabler/icons-react'
import React, { ReactNode, useState } from 'react'

export function UiDebug({ data, hideButton, open }: { data: string | unknown; open?: boolean; hideButton?: boolean }) {
  const theme = useMantineTheme()
  const [show, setShow] = useState(open)
  const content: ReactNode = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  return (
    <Box>
      <Paper
        component="pre"
        fz="xs"
        m={0}
        p={theme.spacing.xs}
        sx={{ overflow: 'auto', textOverflow: 'ellipsis' }}
        withBorder
      >
        {hideButton ? null : (
          <UnstyledButton onClick={() => setShow(!show)}>
            <Group p="xs" spacing="xs">
              {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              <Text size="xs">{show ? 'Hide' : 'Show'} debug data</Text>
            </Group>
          </UnstyledButton>
        )}
        <Box display={show ? 'block' : 'none'}>{content}</Box>
      </Paper>
    </Box>
  )
}

export function UiDebugModal({ data, title }: { data: string | unknown; title?: string }) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title ?? 'Debug'} centered size="xl">
        <UiDebug data={data} open={opened} hideButton />
      </Modal>

      <Tooltip label={`Show debug data`}>
        <ActionIcon color="brand" onClick={() => setOpened(true)}>
          <IconBug size={16} />
        </ActionIcon>
      </Tooltip>
    </>
  )
}
