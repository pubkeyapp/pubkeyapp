import { Button, Paper, useMantineTheme } from '@mantine/core'
import { useAdminPlan } from '@pubkeyapp/web/plan/data-access'
import { UiBackButton } from '@pubkeyapp/web/ui/core'
import { UiForm } from '@pubkeyapp/web/ui/form'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { AdminCreatePlanInput, useAdminUsersQuery } from '@pubkeyapp/web/util/sdk'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminPlanFormFields } from './admin-plan-form-fields'

export function AdminPlanCreateFeature() {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { createItem } = useAdminPlan()
  const [{ data: userData }] = useAdminUsersQuery()

  const createPlan = async (plan: Partial<AdminCreatePlanInput>): Promise<boolean> => {
    return createItem(plan as AdminCreatePlanInput).then((res) => {
      if (typeof res !== 'boolean') {
        navigate(`/admin/plans/${res.id}`)
      }
      return !!res
    })
  }

  const userOptions: { label: string; value: string }[] = useMemo(() => {
    return (
      userData?.items?.map((user) => {
        return { label: `${user.name} - ${user.username}`, value: user.id ?? '' }
      }) ?? []
    )
  }, [userData])

  return (
    <UiPage title={`Create Plan`} leftAction={<UiBackButton />}>
      <Paper withBorder radius="md" p={theme.spacing.md}>
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
