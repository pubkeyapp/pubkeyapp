import { AdminDomainProvider } from '@pubkeyapp/web/admin/data-access'
import { Route, Routes } from 'react-router-dom'
import { AdminDomainCreateFeature } from './admin-domain-create-feature'
import { AdminDomainDetailFeature } from './admin-domain-detail-feature'
import { AdminDomainListFeature } from './admin-domain-list-feature'

export function AdminDomainRoutes() {
  return (
    <AdminDomainProvider>
      <Routes>
        <Route index element={<AdminDomainListFeature />} />
        <Route path="create" element={<AdminDomainCreateFeature />} />
        <Route path=":domainId/*" element={<AdminDomainDetailFeature />} />
      </Routes>
    </AdminDomainProvider>
  )
}
