import { Route, Routes } from 'react-router-dom'
import { AdminClusterCreateFeature } from './admin-cluster-create-feature'
import { AdminClusterDetailFeature } from './admin-cluster-detail.feature'
import { AdminClusterListFeature } from './admin-cluster-list.feature'

export function AdminClusterRoutes() {
  return (
    <Routes>
      <Route index element={<AdminClusterListFeature />} />
      <Route path="create" element={<AdminClusterCreateFeature />} />
      <Route path=":clusterId/*" element={<AdminClusterDetailFeature />} />
    </Routes>
  )
}
