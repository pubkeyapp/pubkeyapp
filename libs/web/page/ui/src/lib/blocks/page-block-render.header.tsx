import { Center, Text } from '@mantine/core'
import { PageBlock } from '@pubkeyapp/sdk'
import React from 'react'

export function PageBlockRenderHeader({ block }: { block: PageBlock }) {
  const data = block.data as { text: string }
  return (
    <Center>
      <Text align="center" size={'xl'}>
        {data.text}
      </Text>
    </Center>
  )
}
