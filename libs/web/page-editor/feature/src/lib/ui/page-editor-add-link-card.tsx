import { Accordion, Group, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { PageEditorBlockPalette } from './page-editor-block-palette'

export function PageEditorAddLinkCard() {
  return (
    <Accordion variant="separated" radius="xl">
      <Accordion.Item value="1">
        <Accordion.Control color="brand">
          <Group position="center">
            <IconPlus size={16} />
            <Text>Add Link</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <PageEditorBlockPalette />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
