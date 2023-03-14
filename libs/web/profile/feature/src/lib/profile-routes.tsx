import { Route, Routes } from 'react-router-dom'
import { ProfileDetailsFeature } from './profile-details-feature'

export function ProfileRoutes() {
  return (
    <Routes>
      <Route path=":username/*" element={<ProfileDetailsFeature />} />
    </Routes>
  )
}
