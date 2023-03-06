import { UiProvider } from '@pubkeyapp/web/ui/core'
import { UiLayout } from '@pubkeyapp/web/ui/layout'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomepageFeature } from './homepage/homepage-feature'
import { NotFoundFeature } from './not-found.feature'

export function WebShellFeature() {
  return (
    <UiProvider>
      <Routes>
        <Route element={<UiLayout />}>
          <Route index element={<Navigate replace to={'/home'} />} />
          <Route path="/home" element={<HomepageFeature />} />
          <Route path="*" element={<NotFoundFeature />} />
        </Route>
      </Routes>
    </UiProvider>
  )
}
