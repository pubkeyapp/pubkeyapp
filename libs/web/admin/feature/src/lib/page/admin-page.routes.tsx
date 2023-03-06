import { AdminDomainProvider, AdminPageProvider } from '@pubkeyapp/web/admin/data-access'
import { Route, Routes } from 'react-router-dom'
import { AdminPageCreateFeature } from './admin-page-create-feature'
import { AdminPageDetailFeature } from './admin-page-detail-feature'
import { AdminPageListFeature } from './admin-page-list-feature'

export function AdminPageRoutes() {
  return (
    <AdminDomainProvider>
      <AdminPageProvider>
        <Routes>
          <Route index element={<AdminPageListFeature />} />
          <Route path="create" element={<AdminPageCreateFeature />} />
          <Route path=":pageId/*" element={<AdminPageDetailFeature />} />
        </Routes>
      </AdminPageProvider>
    </AdminDomainProvider>
  )
}
