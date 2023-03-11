import { ActionIcon, Box, Card, Group, Paper, Stack, Tooltip } from '@mantine/core'
import { PageBlock as PageBlockSDK } from '@pubkeyapp/sdk'
import {
  PageBlockAddModal,
  PageBlockEditIconModal,
  PageBlockEditModal,
  PageBlockRender,
  PageColorSelect,
} from '@pubkeyapp/web/page/ui'
import { UiDebugModal } from '@pubkeyapp/web/ui/core'
import { AdminUpdatePageInput, Page, PageBlock, UserAddPageBlockInput } from '@pubkeyapp/web/util/sdk'
import { IconCopy, IconListNumbers, IconTrash } from '@tabler/icons-react'
import React from 'react'
import { PageEditorAddLinkCard } from './ui/page-editor-add-link-card'

export function PageEditor({
  duplicatePageBlock,
  page,
  removePageBlock,
  updatePage,
  updatePageBlock,
}: {
  duplicatePageBlock: (block: PageBlock) => Promise<void>
  page: Page
  removePageBlock: (block: PageBlock) => Promise<boolean>
  updatePage: (page: Page, input: AdminUpdatePageInput) => Promise<boolean>
  updatePageBlock: (pageBlockId: string, input: UserAddPageBlockInput) => Promise<boolean>
}) {
  return (
    <Box>
      <Stack spacing="xl">
        <PageEditorAddLinkCard />
        <Group position="apart">
          <PageBlockAddModal page={page} />
          <PageColorSelect selected={page?.color!} selectColor={(color) => updatePage(page, { color })} />
        </Group>

        <Stack spacing={'md'}>
          {page?.blocks?.map((block) => (
            <Card key={block.id} radius="xl" withBorder={false}>
              <Stack>
                <PageBlockRender block={block as PageBlockSDK} color={page.color!} />
                <Group spacing={0} position="right" noWrap>
                  <PageBlockEditModal
                    block={block as PageBlockSDK}
                    submit={(data) => updatePageBlock(block.id!, data)}
                  />
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
