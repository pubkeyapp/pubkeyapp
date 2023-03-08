import { Button, Paper, useMantineTheme } from '@mantine/core'
import { UiForm } from '@pubkeyapp/web/ui/form'
import { AdminUpdatePlanInput, Plan } from '@pubkeyapp/web/util/sdk'
import { adminPlanFormFields } from './admin-plan-form-fields'

export function AdminPlanSettingsTab({
  plan,
  updatePlan,
}: {
  plan: Plan
  updatePlan: (plan: Partial<AdminUpdatePlanInput>) => Promise<boolean>
}) {
  const theme = useMantineTheme()

  return (
    <Paper>
      <UiForm<AdminUpdatePlanInput>
        fields={adminPlanFormFields}
        model={{
          name: plan.name,
          description: plan.description,
          priceMonth: plan.priceMonth,
          priceYear: plan.priceYear,
        }}
        submit={updatePlan}
      >
        <Button type="submit">Submit</Button>
      </UiForm>
    </Paper>
  )
}
