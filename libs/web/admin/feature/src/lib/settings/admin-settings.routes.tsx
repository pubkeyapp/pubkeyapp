import { Route, Routes } from 'react-router-dom'
import { AdminSettingsListFeature } from './admin-settings-list.feature'

export function AdminSettingsRoutes() {
  return (
    <Routes>
      <Route index element={<AdminSettingsListFeature />} />
    </Routes>
  )
}
