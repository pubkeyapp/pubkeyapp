import { Anchor, Group, Text } from '@mantine/core'
import { IconExternalLink } from '@tabler//icons-react'
import React from 'react'

export function AdminUiExternalLink({ label, link }: { label?: string; link: string }) {
  return (
    <Anchor href={link} target="_blank">
      <Group spacing={2}>
        <Text pr={0}>{label ?? link}</Text>
        <Text color="dimmed">
          <IconExternalLink size={16} />
        </Text>
      </Group>
    </Anchor>
  )
}
