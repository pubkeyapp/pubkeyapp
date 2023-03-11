import { Anchor, Box, Button, Container, Flex, Group, Paper, Skeleton, Stack, Tooltip } from '@mantine/core'

import { PageEditorPreview } from '@pubkeyapp/web/page/ui'
import { ProfileTypeIcon } from '@pubkeyapp/web/profile/ui'
import { showNotificationError, showNotificationSuccess, UiBackButton, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import {
  AdminUpdatePageInput,
  Page,
  PageBlock,
  PageStatus,
  ProfileType,
  useAnonGetPageQuery,
  UserAddPageBlockInput,
  useUserAddPageBlockMutation,
  useUserDeletePageMutation,
  useUserRemovePageBlockMutation,
  useUserUpdatePageBlockMutation,
  useUserUpdatePageMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconExternalLink } from '@tabler/icons-react'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageEditor } from './page.editor'
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
              <Flex px="xl">
                <Box sx={{ flexGrow: 1 }} py="xl">
                  <Container size="sm">
                    <PageEditor
                      page={page?.item as Page}
                      updatePage={updatePage}
                      duplicatePageBlock={duplicatePageBlock}
                      removePageBlock={removePageBlock}
                      updatePageBlock={updatePageBlock}
                    />
                  </Container>
                </Box>
                <Box sx={{ flexGrow: 0 }} py="xl">
                  {page?.item ? <PageEditorPreview page={page.item} /> : null}
                </Box>
              </Flex>
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
