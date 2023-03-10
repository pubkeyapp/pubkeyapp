import { Button, SimpleGrid } from '@mantine/core'
import React, { useMemo } from 'react'

export function UiLinkExplorers({ path }: { path: string }) {
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
      ].map((i) => ({ ...i, link: i.link.replace('${path}', path) })),
    [path],
  )
  return (
    <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {items.map((item) => (
        <Button size="sm" key={item.label} variant="default" component="a" href={item.link.replace('${path}', path)}>
          View on {item.label}
        </Button>
      ))}
    </SimpleGrid>
  )
}
