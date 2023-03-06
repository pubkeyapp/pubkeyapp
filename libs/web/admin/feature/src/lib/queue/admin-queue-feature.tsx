import { Route, Routes } from 'react-router-dom'
import { QueueDetailFeature } from './feature/queue-detail-feature'
import { QueueListFeature } from './feature/queue-list-feature'

export function AdminQueueFeature() {
  return (
    <Routes>
      <Route index element={<QueueListFeature />} />
      <Route path=":type/*" element={<QueueDetailFeature />} />
    </Routes>
  )
}
