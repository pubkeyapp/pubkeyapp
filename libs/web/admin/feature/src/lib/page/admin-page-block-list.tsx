import { ActionIcon, Box, Group, Paper, Stack, Tooltip } from '@mantine/core'
import { PageBlock as PageBlockSDK, User as UserSDK } from '@pubkeyapp/sdk'
import { PageBlockEditIconModal, PageBlockEditModal, PageBlockRender, PageUserProfile } from '@pubkeyapp/web/page/ui'
import { showNotificationError, showNotificationSuccess, UiDebugModal } from '@pubkeyapp/web/ui/core'
import {
  AdminAddPageBlockInput,
  Page,
  PageBlock,
  useAdminAddPageBlockMutation,
  useAdminRemovePageBlockMutation,
  useAdminUpdatePageBlockMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconCopy, IconListNumbers, IconTrash } from '@tabler//icons-react'
import React from 'react'

export function AdminPageBlockList({ page }: { page: Page }) {
  const [, addPageBlockMutation] = useAdminAddPageBlockMutation()
  const [, updatePageBlockMutation] = useAdminUpdatePageBlockMutation()
  const [, removePageBlockMutation] = useAdminRemovePageBlockMutation()
  const removePageBlock = (block: PageBlock) => {
    if (!confirm(`Do you really want to delete the page block ${block.type}?`)) {
      return false
    }
    removePageBlockMutation({ pageId: page.id!, pageBlockId: block.id! })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Page Block ${block.type} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const duplicatePageBlock = (block: PageBlock) => {
    addPageBlockMutation({ pageId: page.id!, input: { type: block.type, data: block.data, order: block.order } })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Page Block ${block.type} duplicated`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const updatePageBlock = (pageBlockId: string, input: AdminAddPageBlockInput) =>
    updatePageBlockMutation({ pageId: page.id!, pageBlockId, input })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Page Block ${result.data?.item?.type} update`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))

  return (
    <Box>
      <Stack>
        <PageUserProfile user={page?.owner as unknown as UserSDK} />
        <Paper>
          <Stack spacing={'md'}>
            {page?.blocks?.map((block) => (
              <Paper key={block.id} py="md">
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
                          return updatePageBlockMutation({
                            pageId: page.id!,
                            pageBlockId: block.id!,
                            input: { order: parseInt(newOrder) },
                          })
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
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}
