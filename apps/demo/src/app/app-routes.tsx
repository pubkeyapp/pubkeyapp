import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardFeature } from './dashboard/feature/dashboard-feature'
import { NotFoundFeature } from './not-found.feature'
import { UiLayout } from './ui/layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<UiLayout />}>
        <Route index element={<Navigate replace to={'/dashboard'} />} />
        <Route path="/dashboard" element={<DashboardFeature />} />
        <Route path="*" element={<NotFoundFeature />} />
      </Route>
    </Routes>
  )
}
