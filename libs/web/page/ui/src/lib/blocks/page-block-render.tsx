import { Box } from '@mantine/core'
import { PageBlock } from '@pubkeyapp/sdk'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import React from 'react'
import { PageBlockRenderHeader } from './page-block-render.header'
import { PageBlockRenderLink } from './page-block-render.link'

export function PageBlockRender({ block, color }: { block: PageBlock; color?: string }) {
  switch (block.type) {
    case 'Link':
      return <PageBlockRenderLink block={block} color={color} />
    case 'Header':
      return <PageBlockRenderHeader block={block} />

    default:
      return (
        <Box>
          <UiDebug data={block} />
        </Box>
      )
  }
}
