import { Container, Stack } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'
import { WebPageEditorDetailFeature } from './web-page-editor-detail-feature'
import { WebPageEditorListFeature } from './web-page-editor-list-feature'

export function WebPageEditorFeature() {
  return (
    <Container size="xl">
      <Stack>
        <Routes>
          <Route path="/" element={<WebPageEditorListFeature />} />
          <Route path=":pageId" element={<WebPageEditorDetailFeature />} />
        </Routes>
      </Stack>
    </Container>
  )
}
