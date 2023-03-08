import { Button, CopyButton, Group, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export function UiCopyButton({
  disabled = false,
  text,
  label = 'Copy',
  tooltip,
}: {
  text: string
  label?: string
  tooltip?: string
  disabled?: boolean
}) {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : tooltip ?? 'Copy'} withArrow position="top">
          <Button size="sm" color={copied ? 'brand' : 'gray'} onClick={copy} disabled={disabled}>
            <Group>
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              {label}
            </Group>
          </Button>
        </Tooltip>
      )}
    </CopyButton>
  )
}
