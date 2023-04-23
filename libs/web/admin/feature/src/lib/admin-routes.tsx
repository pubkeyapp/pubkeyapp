import { ActionIcon, Box, Container, Group, Stack, Text, Tooltip, UnstyledButton, useMantineTheme } from '@mantine/core'
import { getColorByIndex, UiDashboardItem } from '@pubkeyapp/web/ui/core'
import { UiPageHeader } from '@pubkeyapp/web/ui/page'
import {
  IconCards,
  IconColumns3,
  IconGlobe,
  IconMoneybag,
  IconNotes,
  IconPageBreak,
  IconSettings,
  IconShield,
  IconStack3,
  IconSunglasses,
  IconUsers,
} from '@tabler/icons-react'
import { useMemo } from 'react'
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AdminAccountRoutes } from './account/admin-account.routes'
import { AdminDashboardFeature } from './admin-dashboard-feature'
import { AdminCollectionRoutes } from './collection/admin-collection.routes'
import { AdminDomainRoutes } from './domain/admin-domain.routes'
import { AdminInviteRoutes } from './invite/admin-invite.routes'
import { AdminPageRoutes } from './page/admin-page.routes'
import { AdminPlanRoutes } from './plan/admin-plan.routes'
import { AdminProfileRoutes } from './profile/admin-profile.routes'
import { AdminQueueFeature } from './queue/admin-queue-feature'
import { AdminSettingsRoutes } from './settings/admin-settings.routes'
import { AdminUserRoutes } from './user/admin-user.routes'

export function AdminRoutes() {
  const links: UiDashboardItem[] = useMemo(() => {
    return [
      { label: 'Accounts', icon: IconNotes, link: '/admin/accounts' },
      { label: 'Collections', icon: IconColumns3, link: '/admin/collections' },
      { label: 'Domains', icon: IconGlobe, link: '/admin/domains' },
      { label: 'Invites', icon: IconCards, link: '/admin/invites' },
      { label: 'Pages', icon: IconPageBreak, link: '/admin/pages' },
      { label: 'Plans', icon: IconMoneybag, link: '/admin/plans' },
      { label: 'Profiles', icon: IconSunglasses, link: '/admin/profiles' },
      { label: 'Queues', icon: IconStack3, link: '/admin/queues' },
      { label: 'Settings', icon: IconSettings, link: '/admin/settings' },
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
        <Route path="accounts/*" element={<AdminAccountRoutes />} />
        <Route path="collections/*" element={<AdminCollectionRoutes />} />
        <Route path="dashboard" element={<AdminDashboardFeature links={links} />} />
        <Route path="domains/*" element={<AdminDomainRoutes />} />
        <Route path="invites/*" element={<AdminInviteRoutes />} />
        <Route path="pages/*" element={<AdminPageRoutes />} />
        <Route path="plans/*" element={<AdminPlanRoutes />} />
        <Route path="profiles/*" element={<AdminProfileRoutes />} />
        <Route path="queues/*" element={<AdminQueueFeature />} />
        <Route path="settings/*" element={<AdminSettingsRoutes />} />
        <Route path="users/*" element={<AdminUserRoutes />} />
      </Route>
    </Routes>
  )
}

export function AdminLayout({ links }: { links: UiDashboardItem[] }) {
  const theme = useMantineTheme()
  return (
    <Container size="xl">
      <Stack>
        <UiPageHeader
          title={
            <Text component={Link} to="/admin" size="xl" weight={500}>
              Admin
            </Text>
          }
          leftAction={
            <ActionIcon component={Link} to="/admin">
              <IconShield size={32} />
            </ActionIcon>
          }
          rightAction={
            <Group>
              {links.map((item, index) => (
                <UnstyledButton key={item.label} component={Link} to={item.link} sx={{ display: 'flex' }}>
                  <Tooltip label={item.label} withArrow>
                    <item.icon color={theme.colors[`${item.color}`][6]} size={32} />
                  </Tooltip>
                </UnstyledButton>
              ))}
            </Group>
          }
        />
        <Box>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  )
}
