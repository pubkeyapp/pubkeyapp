import { Route, Routes } from 'react-router-dom'
import { AdminProfileDetailFeature } from './admin-profile-detail-feature'
import { AdminProfileListFeature } from './admin-profile-list-feature'
import { AdminProfileProvider } from './admin-profile-provider'

export function AdminProfileRoutes() {
  return (
    <AdminProfileProvider>
      <Routes>
        <Route index element={<AdminProfileListFeature />} />
        <Route path=":profileId/*" element={<AdminProfileDetailFeature />} />
      </Routes>
    </AdminProfileProvider>
  )
}
