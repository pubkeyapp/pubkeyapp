import { Accordion, Alert, Group, Text } from '@mantine/core'
import { PageColorSelect } from '@pubkeyapp/web/page/ui'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { Page, PageBlockType, UserUpdatePageInput } from '@pubkeyapp/web/util/sdk'
import { IconColorPicker, IconGlobe, IconHammer, IconPlus } from '@tabler/icons-react'
import React from 'react'
import { PageEditorBlockPalette } from './page-editor-block-palette'

export function PageEditorAddLinkCard({
  page,
  addBlock,
  updatePage,
}: {
  page: Page
  addBlock: (type: PageBlockType, data?: any) => void
  updatePage: (page: Page, input: UserUpdatePageInput) => Promise<boolean>
}) {
  return (
    <Accordion variant="separated" radius="xl">
      <Accordion.Item value="1">
        <Accordion.Control>
          <Group position="center">
            <IconPlus size={16} />
            <Text>Add Block</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <PageEditorBlockPalette page={page} addBlock={addBlock} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="2">
        <Accordion.Control>
          <Group position="center">
            <IconColorPicker size={16} />
            <Text>Select Color</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <PageColorSelect selected={page?.color!} selectColor={(color) => updatePage(page, { color })} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="3">
        <Accordion.Control>
          <Group position="center">
            <IconGlobe size={16} />
            <Text>Domains</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          {page?.domains?.length ? <UiDebug data={page?.domains} /> : <Alert>No domains configured</Alert>}

          {/*<PageColorSelect selected={page?.color!} selectColor={(color) => updatePage(page, { color })} />*/}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
