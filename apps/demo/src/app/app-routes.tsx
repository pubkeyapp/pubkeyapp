import { Navigate, Route, Routes } from 'react-router-dom'
import { ComponentsFeature } from './components/components-feature'
import { DashboardFeature } from './dashboard/dashboard-feature'
import { NotFoundFeature } from './not-found.feature'
import { UiLayout } from './ui/layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<UiLayout />}>
        <Route index element={<Navigate replace to={'/dashboard'} />} />
        <Route path="/components" element={<ComponentsFeature />} />
        <Route path="/dashboard" element={<DashboardFeature />} />
        <Route path="*" element={<NotFoundFeature />} />
      </Route>
    </Routes>
  )
}
