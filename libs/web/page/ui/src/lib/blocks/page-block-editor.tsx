import { Badge, Button, Center, Group, Stack, Text } from '@mantine/core'
import { AdminAddPageBlockInput, PageBlockType } from '@pubkeyapp/web/util/sdk'
import { IconHeading } from '@tabler//icons-react'
import React, { useState } from 'react'
import { PageBlockForm } from './page-block-form'
import { pageBlockIcons } from './page-block-icon'

export function PageBlockEditor({ submit }: { submit: (input: AdminAddPageBlockInput) => Promise<boolean> }) {
  const [type, setType] = useState<PageBlockType | undefined>(undefined)

  const comingSoonIcons: { label: string }[] = [
    { label: 'Metaplex NFTs' },
    { label: 'Dialect' },
    { label: 'Solana Pay' },
    { label: 'Backpack' },
    { label: 'Bonfida Name Service' },
    { label: 'Social Media Embeds' },
    { label: 'And more...' },
  ]

  return (
    <Stack>
      <Stack>
        <Center>
          <Button
            size="lg"
            color="gray"
            onClick={() => submit({ type: PageBlockType.Header, data: { text: 'New Header' } })}
          >
            <Group>
              Add Header
              <IconHeading />
            </Group>
          </Button>
        </Center>
        <Center>
          <Text weight={500} size="lg">
            Add Links
          </Text>
        </Center>
        <Center>
          <Group position="center">
            {pageBlockIcons.map((item) => (
              <Button
                size="lg"
                variant="default"
                key={item.type}
                onClick={() =>
                  submit({ type: PageBlockType.Link, data: { icon: item.type, label: item.label, link: item.link } })
                }
              >
                <Group>
                  {item.label}
                  {item.icon}
                </Group>
              </Button>
            ))}
          </Group>
        </Center>
        <Center>
          <Text weight={500} size="lg">
            Coming Soon
          </Text>
        </Center>
        <Center>
          <Group position="center">
            {comingSoonIcons.map((item) => (
              <Badge size="lg" key={item.label}>
                {item.label}
              </Badge>
            ))}
          </Group>
        </Center>
      </Stack>
      <PageBlockForm
        type={type as PageBlockType}
        submit={(data) => submit({ data, type })}
        cancel={() => setType(undefined)}
      />
    </Stack>
  )
}
