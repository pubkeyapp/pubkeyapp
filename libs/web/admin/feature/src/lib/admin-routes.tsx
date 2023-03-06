import { ActionIcon, Box, Container } from '@mantine/core'
import { UiDashboardItem } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import {
  IconCards,
  IconGlobe,
  IconMoneybag,
  IconPageBreak,
  IconShield,
  IconStack3,
  IconUsers,
} from '@tabler//icons-react'
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AdminDashboardFeature } from './admin-dashboard-feature'
import { AdminDomainRoutes } from './domain/admin-domain.routes'
import { AdminInviteRoutes } from './invite/admin-invite.routes'
import { AdminPlanRoutes } from './plan/admin-plan.routes'
import { AdminPageRoutes } from './page/admin-page.routes'
import { AdminQueueFeature } from './queue/admin-queue-feature'
import { AdminUserRoutes } from './user/admin-user.routes'

export function AdminRoutes() {
  const links: UiDashboardItem[] = [
    { label: 'Domains', icon: IconGlobe, link: '/admin/domains' },
    { label: 'Invites', icon: IconCards, link: '/admin/invites' },
    { label: 'Plans', icon: IconMoneybag, link: '/admin/plans' },
    { label: 'Pages', icon: IconPageBreak, link: '/admin/pages' },
    { label: 'Queues', icon: IconStack3, link: '/admin/queues' },
    { label: 'Users', icon: IconUsers, link: '/admin/users' },
  ]
  return (
    <Routes>
      <Route index element={<Navigate replace to="dashboard" />} />
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboardFeature links={links} />} />
        <Route path="domains/*" element={<AdminDomainRoutes />} />
        <Route path="invites/*" element={<AdminInviteRoutes />} />
        <Route path="queues/*" element={<AdminQueueFeature />} />
        <Route path="plans/*" element={<AdminPlanRoutes />} />
        <Route path="pages/*" element={<AdminPageRoutes />} />
        <Route path="users/*" element={<AdminUserRoutes />} />
      </Route>
    </Routes>
  )
}

export function AdminLayout() {
  return (
    <Box>
      <Container mt="lg">
        <UiPageHeader
          title="Admin"
          leftAction={
            <ActionIcon component={Link} to="/admin">
              <IconShield height={32} />
            </ActionIcon>
          }
        />
      </Container>
      <Outlet />
    </Box>
  )
}
