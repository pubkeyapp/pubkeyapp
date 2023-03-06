import { Alert } from '@mantine/core'
import { useAdminPlan } from '@pubkeyapp/web/plan/data-access'
import { UiBackButton, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { Plan, useAdminPlanQuery } from '@pubkeyapp/web/util/sdk'
import { useParams } from 'react-router-dom'

import { AdminPlanOverviewTab } from './admin-plan-overview.tab'
import { AdminPlanSettingsTab } from './admin-plan-settings.tab'

export function AdminPlanDetailFeature() {
  const { planId } = useParams<{ planId: string }>()
  const { updatePlan } = useAdminPlan()
  const [{ data, error, fetching }] = useAdminPlanQuery({ variables: { planId: planId as string } })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      {data?.item ? (
        <UiPage title={`${data.item?.id}`} leftAction={<UiBackButton />}>
          <UiTabRoutes
            tabs={[
              { label: 'Overview', value: 'overview', component: <AdminPlanOverviewTab plan={data.item} /> },
              {
                label: 'Settings',
                value: 'settings',
                component: (
                  <AdminPlanSettingsTab
                    plan={data.item}
                    updatePlan={(input) => updatePlan(data?.item as Plan, input)}
                  />
                ),
              },
            ]}
          />
        </UiPage>
      ) : (
        <UiPage title="Plan">
          <Alert color={'red'}>Plan not found</Alert>
        </UiPage>
      )}
    </UiErrorLoader>
  )
}
