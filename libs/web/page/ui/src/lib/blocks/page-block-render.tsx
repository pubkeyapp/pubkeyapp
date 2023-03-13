import { Box, Button } from '@mantine/core'
import { IdentityProviderAvatar } from '@pubkeyapp/web/identity/ui'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { IdentityProvider, PageBlock, PageBlockType } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { PageBlockRenderHeader } from './page-block-render.header'
import { PageBlockRenderLink } from './page-block-render.link'

export function PageBlockRender({ block, color }: { block: PageBlock; color?: string }) {
  switch (block.type) {
    case PageBlockType.Header:
      return <PageBlockRenderHeader block={block} />
    case PageBlockType.Link:
      return <PageBlockRenderLink block={block} color={color} />
    case PageBlockType.Solana:
      return (
        <PageBlockRenderProvider
          block={block}
          color={color}
          provider={IdentityProvider.Solana}
          to={`https://solscan.io/account/${block.data.providerId}`}
        />
      )
    case PageBlockType.Github:
      return (
        <PageBlockRenderProvider
          block={block}
          color={color}
          provider={IdentityProvider.Github}
          to={`https://github.com/${block.data.profile.username}`}
        />
      )
    case PageBlockType.Discord:
      return (
        <PageBlockRenderProvider
          block={block}
          color={color}
          provider={IdentityProvider.Discord}
          to={`https://discordapp.com/users/${block.data.providerId}`}
        />
      )
    case PageBlockType.Twitter:
      return (
        <PageBlockRenderProvider
          block={block}
          color={color}
          provider={IdentityProvider.Twitter}
          to={`https://twitter.com/${block.data.profile.username}`}
        />
      )
    case PageBlockType.Google:
      return (
        <PageBlockRenderProvider
          block={block}
          color={color}
          provider={IdentityProvider.Google}
          to={`mailto:${block.data.profile.email}`}
          label={`${block.data.profile.email}`}
        />
      )
    default:
      return (
        <Box>
          <UiDebug data={block} />
        </Box>
      )
  }
}

export function PageBlockRenderProvider({
  block,
  color,
  provider,
  to,
  label,
}: {
  block: PageBlock
  color?: string
  provider: IdentityProvider
  to: string
  label?: string
}) {
  return (
    <Button
      color={color ?? 'brand'}
      component="a"
      href={to}
      target="_blank"
      size="xl"
      radius="xl"
      fullWidth
      leftIcon={<IdentityProviderAvatar size={32} provider={provider} />}
    >
      {label ?? block.type}
    </Button>
  )
}
