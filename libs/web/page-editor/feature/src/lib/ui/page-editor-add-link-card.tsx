import { Accordion, Anchor, Box, Button, Group, Paper, Stack, Text } from '@mantine/core'
import { PageColorSelect } from '@pubkeyapp/web/page/ui'
import { UiActionIcon } from '@pubkeyapp/web/ui/core'
import { Page, PageBlockType, PageDomain, UserUpdatePageInput } from '@pubkeyapp/web/util/sdk'
import { IconColorPicker, IconGlobe, IconPlus, IconTrash } from '@tabler/icons-react'
import React, { useState } from 'react'
import { PageEditorBlockPalette } from './page-editor-block-palette'
import { PageEditorDomainForm } from './page-editor-domain-form'

export function PageEditorAddLinkCard({
  page,
  addBlock,
  updatePage,
  removePageDomain,
}: {
  page: Page
  addBlock: (type: PageBlockType, data?: any) => void
  updatePage: (page: Page, input: UserUpdatePageInput) => Promise<boolean>
  removePageDomain: (pageDomain: PageDomain) => void
}) {
  const panel = new URLSearchParams(window.location.search).get('panel') ?? undefined

  return (
    <Accordion variant="separated" radius="xl" defaultValue={panel}>
      <Accordion.Item value="block">
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
      <Accordion.Item value="color">
        <Accordion.Control>
          <Group position="center">
            <IconColorPicker size={16} />
            <Text>Select Color</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <PageColorSelect selected={page.color!} selectColor={(color) => updatePage(page, { color })} />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="domain">
        <Accordion.Control>
          <Group position="center">
            <IconGlobe size={16} />
            <Text>Domains</Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          {page.domains?.length ? (
            <PageEditorDomainList page={page} removePageDomain={removePageDomain} />
          ) : (
            <PageEditorDomainForm page={page} />
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export function PageEditorDomainList({
  page,
  removePageDomain,
}: {
  page: Page
  removePageDomain: (pageDomain: PageDomain) => void
}) {
  const [showForm, setShowForm] = useState(false)
  return (
    <Stack>
      {page?.domains?.map((domain) => (
        <Paper key={domain.id} p="md" radius="lg" style={{ borderWidth: 1 }}>
          <Group position="apart">
            <Group>
              <Anchor href={domain.viewUrl ?? ''} target="_blank" color="brand" size="xl">
                {domain.domain?.name}
                {domain.path ? `/${domain.path}` : ''}
              </Anchor>
            </Group>
            <Group>
              <UiActionIcon
                label={'Remove Domain'}
                icon={IconTrash}
                onClick={() => {
                  if (!domain.id) return
                  removePageDomain(domain)
                }}
              />
            </Group>
          </Group>
        </Paper>
      ))}
      {showForm ? (
        <PageEditorDomainForm
          page={page}
          button={
            <Button size="xl" onClick={() => setShowForm(false)}>
              {'Close'}
            </Button>
          }
        />
      ) : (
        <Group position="center">
          <Button size="xl" onClick={() => setShowForm(true)}>
            {'Add Domain'}
          </Button>
        </Group>
      )}
    </Stack>
  )
}
