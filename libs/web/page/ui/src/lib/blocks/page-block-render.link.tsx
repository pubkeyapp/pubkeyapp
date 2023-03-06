import { Button } from '@mantine/core'
import { PageBlock } from '@pubkeyapp/sdk'
import { IconExternalLink } from '@tabler//icons-react'
import React from 'react'
import { PageBlockIcon, PageBlockIconType } from './page-block-icon'

export function PageBlockRenderLink({ block, color }: { block: PageBlock; color?: string }) {
  const data = block.data as { label: string; link: string; icon?: PageBlockIconType }
  return (
    <Button
      color={color ?? 'brand'}
      component="a"
      href={data.link}
      target="_blank"
      size="xl"
      fullWidth
      radius="xl"
      leftIcon={data.icon ? <PageBlockIcon type={data.icon} /> : <IconExternalLink />}
    >
      {data.label}
    </Button>
  )
}
