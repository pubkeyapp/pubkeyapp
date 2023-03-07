import { ActionIcon, Box, Container, Group, Stack, Text, UnstyledButton, useMantineTheme } from '@mantine/core'
import { getColorByIndex, UiDashboardItem } from '@pubkeyapp/web/ui/core'
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
import { useMemo } from 'react'
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AdminDashboardFeature } from './admin-dashboard-feature'
import { AdminDomainRoutes } from './domain/admin-domain.routes'
import { AdminInviteRoutes } from './invite/admin-invite.routes'
import { AdminPageRoutes } from './page/admin-page.routes'
import { AdminPlanRoutes } from './plan/admin-plan.routes'
import { AdminQueueFeature } from './queue/admin-queue-feature'
import { AdminUserRoutes } from './user/admin-user.routes'

export function AdminRoutes() {
  const links: UiDashboardItem[] = useMemo(() => {
    return [
      { label: 'Domains', icon: IconGlobe, link: '/admin/domains' },
      { label: 'Invites', icon: IconCards, link: '/admin/invites' },
      { label: 'Plans', icon: IconMoneybag, link: '/admin/plans' },
      { label: 'Pages', icon: IconPageBreak, link: '/admin/pages' },
      { label: 'Queues', icon: IconStack3, link: '/admin/queues' },
      { label: 'Users', icon: IconUsers, link: '/admin/users' },
    ].map((item, index) => ({
      ...item,
      color: getColorByIndex(index),
    }))
  }, [])
  return (
    <Routes>
      <Route index element={<Navigate replace to="dashboard" />} />
      <Route element={<AdminLayout links={links} />}>
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

export function AdminLayout({ links }: { links: UiDashboardItem[] }) {
  const theme = useMantineTheme()
  return (
    <Box>
      <Container mt="lg">
        <UiPageHeader
          title={
            <Text component={Link} to="/admin" size="xl" weight={500}>
              Admin
            </Text>
          }
          leftAction={
            <ActionIcon component={Link} to="/admin">
              <IconShield height={32} />
            </ActionIcon>
          }
          rightAction={
            <Group>
              {links.map((item, index) => (
                <UnstyledButton key={item.label} component={Link} to={item.link}>
                  <Stack align="center" spacing={4}>
                    <item.icon color={theme.colors[`${item.color}`][6]} size={32} />
                    <Text size="xs" color="dimmed">
                      {item.label}
                    </Text>
                  </Stack>
                </UnstyledButton>
              ))}
            </Group>
          }
        />
      </Container>
      <Outlet />
    </Box>
  )
}
