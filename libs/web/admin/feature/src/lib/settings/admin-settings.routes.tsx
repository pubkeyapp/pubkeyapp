import { Route, Routes } from 'react-router-dom'
import { AdminSettingsDetailFeature } from './admin-settings-detail.feature'
import { AdminSettingsListFeature } from './admin-settings-list.feature'

export function AdminSettingsRoutes() {
  return (
    <Routes>
      <Route index element={<AdminSettingsListFeature />} />
      <Route path=":accountId/*" element={<AdminSettingsDetailFeature />} />
    </Routes>
  )
}
