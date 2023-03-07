import { Center } from '@mantine/core'
import { PageBlock } from '@pubkeyapp/sdk'
import React from 'react'
import ReactMarkdown from 'react-markdown'

export function PageBlockRenderHeader({ block }: { block: PageBlock }) {
  const data = block.data as { text: string }
  return (
    <Center>
      <ReactMarkdown>{data.text}</ReactMarkdown>
    </Center>
  )
}
