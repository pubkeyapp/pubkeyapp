import { Alert, Button, Group, Stack } from '@mantine/core'
import { useAdminPage } from '@pubkeyapp/web/admin/data-access'
import { AdminUiPageLabel } from '@pubkeyapp/web/admin/ui'
import { UiBackButton, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { Page, useAdminPageQuery } from '@pubkeyapp/web/util/sdk'
import { IconExternalLink } from '@tabler//icons-react'
import { useParams } from 'react-router-dom'

import { AdminPageBlocksTab } from './admin-page-blocks.tab'
import { AdminPageDomainsTab } from './admin-page-domains.tab'
import { AdminPageSettingsTab } from './admin-page-settings.tab'

export function AdminPageDetailFeature() {
  const { pageId } = useParams<{ pageId: string }>()
  const { updatePage } = useAdminPage()
  const [{ data, error, fetching }] = useAdminPageQuery({ variables: { pageId: pageId as string } })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      {data?.item ? (
        <UiPage
          title={<AdminUiPageLabel page={data.item} />}
          leftAction={<UiBackButton />}
          rightAction={
            <Group align="center">
              <Button component={'a'} href={data.item.previewUrl!} target={'_blank'}>
                <Group spacing={2}>
                  Preview
                  <IconExternalLink size={16} />
                </Group>
              </Button>
            </Group>
          }
        >
          <UiTabRoutes
            tabs={[
              {
                label: 'Editor',
                value: 'editor',
                component: (
                  <Stack>
                    <AdminPageBlocksTab page={data.item} />
                  </Stack>
                ),
              },
              {
                label: 'Domains',
                value: 'domains',
                component: <AdminPageDomainsTab page={data.item} />,
              },
              {
                label: 'Settings',
                value: 'settings',
                component: (
                  <AdminPageSettingsTab
                    page={data.item}
                    updatePage={(input) => updatePage(data?.item as Page, input)}
                  />
                ),
              },
            ]}
          />
        </UiPage>
      ) : (
        <UiPage title="Page">
          <Alert color={'red'}>Page not found</Alert>
        </UiPage>
      )}
    </UiErrorLoader>
  )
}
