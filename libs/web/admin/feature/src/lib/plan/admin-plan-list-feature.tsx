import { Alert } from '@mantine/core'
import { useAdminPlan } from '@pubkeyapp/web/plan/data-access'
import { PlanTable } from '@pubkeyapp/web/plan/ui'
import { UiActionLink, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { IconCards, IconPlus } from '@tabler//icons-react'

export function AdminPlanListFeature() {
  const { deletePlan, error, plans, loading } = useAdminPlan()

  return (
    <UiErrorLoader error={error} loading={loading}>
      <UiPage
        title="Plans"
        leftAction={<IconCards />}
        rightAction={<UiActionLink to="create" label="Create plan" icon={<IconPlus size={16} stroke={1.5} />} />}
      >
        {plans?.length ? (
          <PlanTable plans={plans} deletePlan={deletePlan} />
        ) : (
          <Alert>No plans found</Alert>
        )}
      </UiPage>
    </UiErrorLoader>
  )
}
