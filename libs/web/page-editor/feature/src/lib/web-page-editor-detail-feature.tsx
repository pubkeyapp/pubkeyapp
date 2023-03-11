import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Card,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Tooltip,
} from '@mantine/core'
import { PageBlock as PageBlockSDK } from '@pubkeyapp/sdk'

import {
  PageBlockAddModal,
  PageBlockEditIconModal,
  PageBlockEditModal,
  PageBlockRender,
  PageColorSelect,
  PageEditorPreview,
  PageTypeIcon,
} from '@pubkeyapp/web/page/ui'
import { ProfileTypeIcon } from '@pubkeyapp/web/profile/ui'
import {
  showNotificationError,
  showNotificationSuccess,
  UiBackButton,
  UiDebugModal,
  UiTabRoutes,
} from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import {
  AdminUpdatePageInput,
  Page,
  PageBlock,
  PageStatus,
  PageType,
  ProfileType,
  useAnonGetPageQuery,
  UserAddPageBlockInput,
  useUserAddPageBlockMutation,
  useUserDeletePageMutation,
  useUserRemovePageBlockMutation,
  useUserUpdatePageBlockMutation,
  useUserUpdatePageMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconCopy, IconExternalLink, IconListNumbers, IconTrash } from '@tabler/icons-react'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { WebPageEditorPublishTab } from './web-page-editor-publish-tab'

export function WebPageEditorDetailFeature() {
  const { pageId } = useParams<{ pageId: string }>()
  const [{ data: page }] = useAnonGetPageQuery({ variables: { pageId: `${pageId}` } })
  const [, addPageBlockMutation] = useUserAddPageBlockMutation()
  const [, deletePageMutation] = useUserDeletePageMutation()
  const [, updatePageMutation] = useUserUpdatePageMutation()
  const [, updatePageBlockMutation] = useUserUpdatePageBlockMutation()
  const [, removePageBlockMutation] = useUserRemovePageBlockMutation()
  const navigate = useNavigate()

  const removePageBlock = async (block: PageBlock) => {
    if (!confirm(`Do you really want to delete the page block ${block.type}?`)) {
      return false
    }
    return removePageBlockMutation({ pageId: pageId!, pageBlockId: block.id! })
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

  const duplicatePageBlock = async (block: PageBlock) => {
    addPageBlockMutation({ pageId: pageId!, input: { type: block.type, data: block.data, order: block.order } })
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
  const updatePage = async (page: Page, input: AdminUpdatePageInput): Promise<boolean> => {
    return updatePageMutation({
      pageId: `${page.id}`,
      input: { ...input },
    })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Profile updated')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updatePageBlock = (pageBlockId: string, input: UserAddPageBlockInput) =>
    updatePageBlockMutation({ pageId: pageId!, pageBlockId, input })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Page Block ${result.data?.item?.type} updated`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))

  const deletePage = () => {
    if (!confirm(`Do you really want to delete the page ${page?.item?.profile?.type}?`)) {
      return false
    }
    return deletePageMutation({ pageId: pageId! })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          navigate('/dashboard')
          return showNotificationSuccess(`Page ${page?.item?.profile?.type} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Stack spacing="xl">
      <Skeleton visible={!page?.item} radius="xl">
        <UiPageHeader
          title={
            <Group>
              <ProfileTypeIcon type={page?.item?.profile?.type as ProfileType} size={36} />
              <Tooltip label={`Edit the ${page?.item?.profile?.type} page`}>
                <Anchor component={Link} to={`/pages/${page?.item?.id}`} size="xl">
                  {page?.item?.profile?.type}
                </Anchor>
              </Tooltip>
            </Group>
          }
          leftAction={<UiBackButton to="/dashboard" />}
          rightAction={
            page?.item?.status === PageStatus.Published ? (
              <Button>View Page</Button>
            ) : (
              <Group>
                <Button
                  size="sm"
                  component={Link}
                  to={`${page?.item?.viewUrl}`}
                  target="_blank"
                  rightIcon={<IconExternalLink size={16} />}
                >
                  View Page
                </Button>
                <Button size="sm" component={Link} to={`/pages/${pageId}/publish`}>
                  Publish Page
                </Button>
              </Group>
            )
          }
        />
      </Skeleton>

      <UiTabRoutes
        tabs={[
          {
            label: 'Editor',
            value: 'editor',
            component: (
              <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <PageEditor
                  page={page?.item as Page}
                  updatePage={updatePage}
                  duplicatePageBlock={duplicatePageBlock}
                  removePageBlock={removePageBlock}
                  updatePageBlock={updatePageBlock}
                />
                <Box>{page?.item ? <PageEditorPreview page={page.item} /> : null}</Box>
              </SimpleGrid>
            ),
          },
          {
            label: 'Publish',
            value: 'publish',
            component: (
              <Container size="md">
                <WebPageEditorPublishTab page={page?.item as Page} />
              </Container>
            ),
          },
          {
            label: 'Settings',
            value: 'settings',
            component: (
              <Container size="md">
                <Paper>
                  <Group position="center">
                    <Button variant="outline" color="red" onClick={deletePage}>
                      Delete Page
                    </Button>
                  </Group>
                </Paper>
              </Container>
            ),
          },
        ]}
      />
      {/*<UiDebugModal data={{ page }} />*/}
    </Stack>
  )
}

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
    <Paper>
      <Stack spacing="xl">
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
    </Paper>
  )
}
