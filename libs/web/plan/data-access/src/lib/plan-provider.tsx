import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import {
  AdminCreatePlanInput,
  AdminListPlanInput,
  AdminUpdatePlanInput,
  Plan,
  useAdminCreatePlanMutation,
  useAdminDeletePlanMutation,
  useAdminPlansQuery,
  useAdminUpdatePlanMutation,
} from '@pubkeyapp/web/util/sdk'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface AdminPlanProviderContext {
  plans: Plan[]
  loading: boolean
  error: string | null
  createItem: (input: AdminCreatePlanInput) => Promise<Plan | boolean>
  deletePlan: (plan: Plan) => Promise<boolean>
  updatePlan: (plan: Plan, input: AdminUpdatePlanInput) => Promise<boolean>

  refresh: () => void
}

const AdminPlanContext = createContext<AdminPlanProviderContext>({} as AdminPlanProviderContext)

function AdminPlanProvider({ children, ownerId }: { children: ReactNode; ownerId?: string | null }) {
  const [input] = useState<AdminListPlanInput>({})
  const [{ data, error, fetching }, refresh] = useAdminPlansQuery({ variables: { input } })
  const [, createItemMutation] = useAdminCreatePlanMutation()
  const [, deletePlanMutation] = useAdminDeletePlanMutation()
  const [, updatePlanMutation] = useAdminUpdatePlanMutation()

  const createItem = async (input: AdminCreatePlanInput): Promise<Plan | boolean> => {
    return createItemMutation({ input: { ...input } })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Plan created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const deletePlan = (plan: Plan): Promise<boolean> => {
    if (!window.confirm(`Are you sure you want to delete ${plan.id}?`)) {
      return Promise.resolve(false)
    }
    return deletePlanMutation({ planId: `${plan.id}` })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Plan ${plan.id} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updatePlan = async (plan: Plan, input: AdminUpdatePlanInput): Promise<boolean> => {
    return updatePlanMutation({
      planId: `${plan.id}`,
      input: { ...input },
    })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Plan created')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const value = {
    plans: data?.items ?? [],
    loading: fetching,
    error: error?.message ?? null,
    createItem,
    deletePlan,
    updatePlan,
    refresh,
  }
  return <AdminPlanContext.Provider value={value}>{children}</AdminPlanContext.Provider>
}

const useAdminPlan = () => useContext(AdminPlanContext)

export { AdminPlanProvider, useAdminPlan }
