import { Button, Paper } from '@mantine/core'
import { useAdminPlan } from '@pubkeyapp/web/plan/data-access'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { UiForm } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminCreatePlanInput } from '@pubkeyapp/web/util/sdk'
import { useNavigate } from 'react-router-dom'
import { adminPlanFormFields } from './admin-plan-form-fields'

export function AdminPlanCreateFeature() {
  const navigate = useNavigate()
  const { createItem } = useAdminPlan()

  const createPlan = async (plan: Partial<AdminCreatePlanInput>): Promise<boolean> => {
    return createItem(plan as AdminCreatePlanInput).then((res) => {
      if (typeof res !== 'boolean') {
        navigate(`/admin/plans/${res.id}`)
      }
      return !!res
    })
  }

  return (
    <UiPage title={`Create Plan`} leftAction={<UiBackButton />}>
      <Paper>
        <UiForm<AdminCreatePlanInput>
          fields={adminPlanFormFields}
          model={{
            name: '',
            description: '',
            recommended: false,
            currency: 'USD',
            priceMonth: 0,
            priceYear: 0,
          }}
          submit={createPlan}
        >
          <Button type="submit">Create</Button>
        </UiForm>
      </Paper>
    </UiPage>
  )
}
