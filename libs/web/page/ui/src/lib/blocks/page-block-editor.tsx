import { Button, Center, Group, Stack, Text } from '@mantine/core'
import { AdminAddPageBlockInput, PageBlockType } from '@pubkeyapp/web/util/sdk'
import { IconHeading } from '@tabler//icons-react'
import React, { useState } from 'react'
import { PageBlockForm } from './page-block-form'
import { pageBlockIcons } from './page-block-icon'

export function PageBlockEditor({ submit }: { submit: (input: AdminAddPageBlockInput) => Promise<boolean> }) {
  const [type, setType] = useState<PageBlockType | undefined>(undefined)

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
                color="gray"
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
      </Stack>
      <PageBlockForm
        type={type as PageBlockType}
        submit={(data) => submit({ data, type })}
        cancel={() => setType(undefined)}
      />
    </Stack>
  )
}
