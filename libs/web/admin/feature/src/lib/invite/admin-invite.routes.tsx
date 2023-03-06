import { AdminInviteProvider } from '@pubkeyapp/web/invite/data-access'
import { Route, Routes } from 'react-router-dom'
import { AdminInviteCreateFeature } from './admin-invite-create-feature'
import { AdminInviteDetailFeature } from './admin-invite-detail-feature'
import { AdminInviteListFeature } from './admin-invite-list-feature'

export function AdminInviteRoutes() {
  return (
    <AdminInviteProvider>
      <Routes>
        <Route index element={<AdminInviteListFeature />} />
        <Route path="create" element={<AdminInviteCreateFeature />} />
        <Route path=":inviteId/*" element={<AdminInviteDetailFeature />} />
      </Routes>
    </AdminInviteProvider>
  )
}
