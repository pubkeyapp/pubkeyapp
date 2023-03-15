import { Stack } from '@mantine/core'
import { PageBlock } from '@pubkeyapp/web/util/sdk'
import React from 'react'

const ReactMarkdown: any = import('react-markdown').then(({ default: ReactMarkdown }) => ReactMarkdown)

export function PageBlockRenderHeader({ block }: { block: PageBlock }) {
  const data = block.data as { text: string }
  return (
    <Stack align="center" spacing={0}>
      <ReactMarkdown>{data.text}</ReactMarkdown>
    </Stack>
  )
}
