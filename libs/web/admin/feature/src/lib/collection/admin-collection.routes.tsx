import { Route, Routes } from 'react-router-dom'
import { AdminCollectionCreateFeature } from './admin-collection-create-feature'
import { AdminCollectionDetailFeature } from './admin-collection-detail.feature'
import { AdminCollectionListFeature } from './admin-collection-list.feature'

export function AdminCollectionRoutes() {
  return (
    <Routes>
      <Route index element={<AdminCollectionListFeature />} />
      <Route path="create" element={<AdminCollectionCreateFeature />} />
      <Route path=":collectionId/*" element={<AdminCollectionDetailFeature />} />
    </Routes>
  )
}
