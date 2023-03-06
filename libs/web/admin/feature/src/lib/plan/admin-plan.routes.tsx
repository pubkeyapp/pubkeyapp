import { AdminPlanProvider } from '@pubkeyapp/web/plan/data-access'
import { Route, Routes } from 'react-router-dom'
import { AdminPlanCreateFeature } from './admin-plan-create-feature'
import { AdminPlanDetailFeature } from './admin-plan-detail-feature'
import { AdminPlanListFeature } from './admin-plan-list-feature'

export function AdminPlanRoutes() {
  return (
    <AdminPlanProvider>
      <Routes>
        <Route index element={<AdminPlanListFeature />} />
        <Route path="create" element={<AdminPlanCreateFeature />} />
        <Route path=":planId/*" element={<AdminPlanDetailFeature />} />
      </Routes>
    </AdminPlanProvider>
  )
}
