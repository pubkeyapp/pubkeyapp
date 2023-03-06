import { Alert, Group, Text } from '@mantine/core'
import { useAdminDomain } from '@pubkeyapp/web/admin/data-access'
import { AdminUiDomainLabel, AdminUiUserLink } from '@pubkeyapp/web/admin/ui'
import { UiBackButton, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { Domain, useAdminDomainQuery } from '@pubkeyapp/web/util/sdk'
import { useParams } from 'react-router-dom'

import { AdminDomainOverviewTab } from './admin-domain-overview.tab'
import { AdminDomainSettingsTab } from './admin-domain-settings.tab'

export function AdminDomainDetailFeature() {
  const { domainId } = useParams<{ domainId: string }>()
  const { updateDomain } = useAdminDomain()
  const [{ data, error, fetching }] = useAdminDomainQuery({ variables: { domainId: domainId as string } })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      {data?.item ? (
        <UiPage
          title={<AdminUiDomainLabel domain={data.item} />}
          leftAction={<UiBackButton />}
          rightAction={
            <Group align="center">
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
                Owned by
              </Text>
              {data?.item?.owner ? <AdminUiUserLink user={data?.item?.owner} /> : null}
            </Group>
          }
        >
          <UiTabRoutes
            tabs={[
              { label: 'Overview', value: 'overview', component: <AdminDomainOverviewTab domain={data.item} /> },
              {
                label: 'Settings',
                value: 'settings',
                component: (
                  <AdminDomainSettingsTab
                    domain={data.item}
                    updateDomain={(input) => updateDomain(data?.item as Domain, input)}
                  />
                ),
              },
            ]}
          />
        </UiPage>
      ) : (
        <UiPage title="Domain">
          <Alert color={'red'}>Domain not found</Alert>
        </UiPage>
      )}
    </UiErrorLoader>
  )
}
