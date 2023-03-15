import { ActionIcon, Box, Button, Card, Group, Stack, Text, Tooltip } from '@mantine/core'
import { PageBlockEditIconModal, PageBlockEditModal, PageBlockRender } from '@pubkeyapp/web/page/ui'
import { UiDebugModal, UiLoader } from '@pubkeyapp/web/ui/core'
import {
  AdminUpdatePageInput,
  Page,
  PageBlock,
  PageBlockType,
  PageDomain,
  UserAddPageBlockInput,
} from '@pubkeyapp/web/util/sdk'
import { IconCopy, IconListNumbers, IconTrash } from '@tabler/icons-react'
import React, { useState } from 'react'
import { PageEditorAddLinkCard } from './ui/page-editor-add-link-card'

export function PageEditor({
  duplicatePageBlock,
  page,
  addPageBlock,
  removePageBlock,
  updatePage,
  updatePageBlock,
  removePageDomain,
}: {
  duplicatePageBlock: (block: PageBlock) => Promise<void>
  page: Page
  addPageBlock: (type: PageBlockType, data?: any) => Promise<void>
  removePageBlock: (block: PageBlock) => Promise<boolean>
  updatePage: (page: Page, input: AdminUpdatePageInput) => Promise<boolean>
  updatePageBlock: (pageBlockId: string, input: UserAddPageBlockInput) => Promise<boolean>
  removePageDomain: (pageDomain: PageDomain) => void
}) {
  const [editing, setEditing] = useState<PageBlock | undefined>(undefined)
  const updatePageBlockOrder = async (block: PageBlock) => {
    const newOrder = prompt('Update the block order', block.order?.toString())

    if (newOrder === null || newOrder === block.order?.toString()) {
      return false
    }
    return updatePageBlock(block.id!, { order: parseInt(newOrder) })
  }

  if (!page) {
    return <UiLoader />
  }
  return (
    <Box>
      <Stack spacing={64}>
        <PageEditorAddLinkCard
          page={page}
          addBlock={addPageBlock}
          updatePage={updatePage}
          removePageDomain={removePageDomain}
        />
        <Stack spacing={'md'}>
          {page?.blocks?.map((block) => (
            <Box key={block.id}>
              {editing?.id === block?.id ? (
                <Card key={block.id} radius="xl" withBorder={false}>
                  <Stack>
                    <PageBlockRender block={block} color={page.color!} />
                    <PageEditorBlockActions
                      block={block}
                      duplicatePageBlock={duplicatePageBlock}
                      updatePageBlock={updatePageBlock}
                      updatePageBlockOrder={updatePageBlockOrder}
                      removePageBlock={removePageBlock}
                    />
                  </Stack>
                </Card>
              ) : (
                <Stack>
                  <Tooltip label={`Edit ${block.type} block`}>
                    <Button variant="subtle" onClick={() => setEditing(block)}>
                      <Text>{`${block.type}`}</Text>
                    </Button>
                  </Tooltip>
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
export function PageEditorBlockActions({
  block,
  duplicatePageBlock,
  updatePageBlock,
  updatePageBlockOrder,
  removePageBlock,
}: {
  block: PageBlock
  duplicatePageBlock: (block: PageBlock) => Promise<void>
  updatePageBlockOrder: (block: PageBlock) => Promise<boolean>
  updatePageBlock: (pageBlockId: string, input: UserAddPageBlockInput) => Promise<boolean>
  removePageBlock: (block: PageBlock) => Promise<boolean>
}) {
  return (
    <Group spacing={0} position="right" noWrap>
      <PageBlockEditModal block={block} submit={(data) => updatePageBlock(block.id!, data)} />
      <PageBlockEditIconModal block={block} submit={(data) => updatePageBlock(block.id!, data)} />
      <Tooltip label={`Change block order (${block.order})`}>
        <ActionIcon color="brand" onClick={() => updatePageBlockOrder(block)}>
          <IconListNumbers size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Duplicate block">
        <ActionIcon color="brand" onClick={() => duplicatePageBlock(block)}>
          <IconCopy size={16} />
        </ActionIcon>
      </Tooltip>
      <UiDebugModal data={block} title="PageBlock" />
      <Tooltip label="Delete block">
        <ActionIcon color="red" onClick={() => removePageBlock(block)}>
          <IconTrash size={16} />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
