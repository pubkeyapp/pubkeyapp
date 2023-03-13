import { ActionIcon, Box, Card, Group, Stack, Tooltip } from '@mantine/core'
import {
  PageBlockAddModal,
  PageBlockEditIconModal,
  PageBlockEditModal,
  PageBlockRender,
  PageColorSelect,
} from '@pubkeyapp/web/page/ui'
import { UiDebugModal, UiLoader } from '@pubkeyapp/web/ui/core'
import { AdminUpdatePageInput, Page, PageBlock, PageBlockType, UserAddPageBlockInput } from '@pubkeyapp/web/util/sdk'
import { IconCopy, IconListNumbers, IconTrash } from '@tabler/icons-react'
import React from 'react'
import { PageEditorAddLinkCard } from './ui/page-editor-add-link-card'

export function PageEditor({
  duplicatePageBlock,
  page,
  addPageBlock,
  removePageBlock,
  updatePage,
  updatePageBlock,
}: {
  duplicatePageBlock: (block: PageBlock) => Promise<void>
  page: Page
  addPageBlock: (type: PageBlockType, data?: any) => Promise<void>
  removePageBlock: (block: PageBlock) => Promise<boolean>
  updatePage: (page: Page, input: AdminUpdatePageInput) => Promise<boolean>
  updatePageBlock: (pageBlockId: string, input: UserAddPageBlockInput) => Promise<boolean>
}) {
  if (!page) {
    return <UiLoader />
  }
  return (
    <Box>
      <Stack spacing={64}>
        <PageEditorAddLinkCard page={page} addBlock={addPageBlock} updatePage={updatePage} />
        <Stack spacing={'md'}>
          {page?.blocks?.map((block) => (
            <Card key={block.id} radius="xl" withBorder={false}>
              <Stack>
                <PageBlockRender block={block} color={page.color!} />
                <Group spacing={0} position="right" noWrap>
                  <PageBlockEditModal block={block} submit={(data) => updatePageBlock(block.id!, data)} />
                  <PageBlockEditIconModal block={block} submit={(data) => updatePageBlock(block.id!, data)} />
                  <Tooltip label={`Change block order (${block.order})`}>
                    <ActionIcon
                      color="brand"
                      onClick={() => {
                        const newOrder = prompt('Update the block order', block.order?.toString())

                        if (newOrder === null || newOrder === block.order?.toString()) {
                          return false
                        }
                        return updatePageBlock(block.id!, { order: parseInt(newOrder) })
                      }}
                    >
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
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
