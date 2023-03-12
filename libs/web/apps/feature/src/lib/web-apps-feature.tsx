import { UiNotFound } from '@pubkeyapp/web/ui/core'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const PageEditorFeature = lazy(() => import('@pubkeyapp/web/page-editor/feature'))
export function WebAppsFeature() {
  return (
    <Routes>
      <Route path="gum" element={<div>gum!</div>} />
      <Route path="pages/*" element={<PageEditorFeature />} />
      <Route path="*" element={<UiNotFound />} />
    </Routes>
  )
}
