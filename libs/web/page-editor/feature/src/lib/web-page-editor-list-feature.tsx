import { Paper, Stack, Text } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { PageList, PageTypeColor } from '@pubkeyapp/web/page/ui'
import { showNotificationError, showNotificationSuccess, UiBackButton } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import { PageType, UserCreatePageInput, useUserCreatePageMutation, useUserPagesQuery } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function WebPageEditorListFeature() {
  const { user } = useAuth()
  const [{ data: pages }] = useUserPagesQuery()
  const [_, createPageMutation] = useUserCreatePageMutation()

  const createPage = async (type: PageType) => {
    const input: UserCreatePageInput = {
      type,
      title: user?.username ?? '',
      description: `This is the ${type} page of ${user?.username}`,
      color: PageTypeColor({ type }),
    }
    createPageMutation({ input: { ...input } })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Page created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Stack>
      <UiPageHeader
        title={
          <Text component={Link} to="/pages" size="xl">
            Pages
          </Text>
        }
        leftAction={<UiBackButton to="/dashboard" />}
      />
      <Paper>
        <Stack>
          <Text size="xl" fw={500}>
            Your pages
          </Text>
          <PageList pages={pages?.items ?? []} createPage={createPage} />
        </Stack>
      </Paper>
    </Stack>
  )
}
