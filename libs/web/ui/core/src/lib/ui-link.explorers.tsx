import { Button, SimpleGrid } from '@mantine/core'
import { NetworkType } from '@pubkeyapp/web/util/sdk'
import React, { useMemo } from 'react'

export function UiLinkExplorers({ path, network }: { path: string; network?: NetworkType }) {
  let cluster: string | undefined
  if (network === NetworkType.SolanaDevnet) {
    cluster = 'devnet'
  }
  if (network === NetworkType.SolanaTestnet) {
    cluster = 'testnet'
  }
  const items: { label: string; link: string }[] = useMemo(
    () =>
      [
        {
          label: 'Solscan',
          link: 'https://solscan.io/${path}',
        },
        {
          label: 'Solana Explorer',
          link: 'https://explorer.solana.com/${path}',
        },
        {
          label: 'Solana.fm',
          link: 'https://solana.fm/${path}',
        },
      ].map((i) => {
        const link = i.link.replace('${path}', path.replace('//', '/'))

        return { ...i, link: cluster ? `${link}?cluster=${cluster}` : link }
      }),
    [path],
  )
  return (
    <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {items.map((item) => (
        <Button
          size="xs"
          key={item.label}
          variant="default"
          component="a"
          href={item.link.replace('${path}', path)}
          target="_blank"
        >
          {item.label}
        </Button>
      ))}
    </SimpleGrid>
  )
}
