import { ActionIcon, CopyButton as Copy, CopyButton, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export function UiCopy({ text, tooltip }: { text: string; tooltip?: string }) {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : tooltip ?? 'Copy'} withArrow position="top">
          <ActionIcon size="sm" color={copied ? 'brand' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}
