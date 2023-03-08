import { Route, Routes } from 'react-router-dom'
import { AdminAccountDetailFeature } from './admin-account-detail.feature'
import { AdminAccountListFeature } from './admin-account-list.feature'

export function AdminAccountRoutes() {
  return (
    <Routes>
      <Route index element={<AdminAccountListFeature />} />
      <Route path=":accountId/*" element={<AdminAccountDetailFeature />} />
    </Routes>
  )
}
