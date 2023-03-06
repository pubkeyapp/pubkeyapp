import { Flex, Text } from '@mantine/core'
import { IconClock } from '@tabler/icons-react'
import TimeAgo from 'timeago-react'

export function UiTimestamp({ epoch }: { epoch: number }) {
  const date = new Date(epoch)

  return (
    <Flex align="center">
      <Text mr={8}>
        <TimeAgo datetime={date} />
      </Text>
      <IconClock size={14} />
      <Text ml={8}>{date.toUTCString()}</Text>
    </Flex>
  )
}
