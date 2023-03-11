import { Stack } from '@mantine/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebPageEditorDetailFeature } from './web-page-editor-detail-feature'

export function WebPageEditorFeature() {
  return (
    <Stack p={16}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path=":pageId/*" element={<WebPageEditorDetailFeature />} />
      </Routes>
    </Stack>
  )
}
