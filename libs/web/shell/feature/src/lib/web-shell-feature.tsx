import { Container, Paper } from '@mantine/core'
import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { AppsProvider, AppType } from '@pubkeyapp/web/apps/data-access'
import { GumLogo } from '@pubkeyapp/web/apps/ui'
import { AuthGuard, AuthProvider, UserRoleGuard, UserStatusGuard } from '@pubkeyapp/web/auth/data-access'
import { ConfigProvider, SolanaProvider } from '@pubkeyapp/web/shell/data-access'
import { UiNotFound } from '@pubkeyapp/web/ui/core'
import { UiLayout } from '@pubkeyapp/web/ui/layout'
import { UiThemeProvider } from '@pubkeyapp/web/ui/theme'
import { GraphQLProvider, UserRole, UserStatus } from '@pubkeyapp/web/util/sdk'
import { lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { EarlyFeature } from './early/early-feature'

const AccountFeature = lazy(() => import('@pubkeyapp/web/account/feature'))
const AppsFeature = lazy(() => import('@pubkeyapp/web/apps/feature'))
const AdminFeature = lazy(() => import('@pubkeyapp/web/admin/feature'))
const DashboardFeature = lazy(() => import('@pubkeyapp/web/dashboard/feature'))
const DevFeature = lazy(() => import('@pubkeyapp/web/dev/feature'))
const HomepageFeature = lazy(() => import('@pubkeyapp/web/homepage/feature'))
const LoginFeature = lazy(() => import('@pubkeyapp/web/auth/feature'))
const ProfileFeature = lazy(() => import('@pubkeyapp/web/profile/feature'))
const PageFeature = lazy(() => import('@pubkeyapp/web/page/feature'))
const PlanFeature = lazy(() => import('@pubkeyapp/web/plan/feature'))
const SearchFeature = lazy(() => import('@pubkeyapp/web/search/feature'))

export function WebShellFeature() {
  const pages = [
    '/learn',
    '/docs',
    '/resources',
    '/sdk',
    '/support',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
    '/pricing',
    '/verified',
  ]
  const apps = [
    { id: AppType.PubKeyPages, name: 'PubKey Pages', logo: <PubKeyLogoRounded size={64} /> },
    { id: AppType.GumProfile, name: 'Gum Profile', logo: <GumLogo width={64} height={64} /> },
  ]
  return (
    <UiThemeProvider>
      <Routes>
        <Route index element={<Navigate replace to={'/home'} />} />
        <Route element={<UiLayout homepage />}>
          <Route path="/home" element={<HomepageFeature />} />
          {pages.map((page) => (
            <Route key={page} path={`${page}`} element={<PlaceholderComponent page={page} />} />
          ))}
        </Route>
        <Route element={<AppProviders />}>
          <Route element={<UiLayout />}>
            <Route path="/login" element={<LoginFeature />} />
            <Route element={<AuthGuard redirectTo="/login" />}>
              <Route
                element={
                  <AppsProvider apps={apps}>
                    <UserStatusGuard status={UserStatus.Active} element={<EarlyFeature />} />
                  </AppsProvider>
                }
              >
                <Route path="/account/*" element={<AccountFeature />} />
                <Route path="/apps/*" element={<AppsFeature />} />
                <Route path="/dashboard/*" element={<DashboardFeature />} />
                <Route path="/search/*" element={<SearchFeature />} />
                <Route element={<UserRoleGuard role={UserRole.Admin} />}>
                  <Route path="/admin/pricing" element={<PlanFeature />} />
                  <Route path="/admin/*" element={<AdminFeature />} />
                  <Route path="/dev/*" element={<DevFeature />} />
                </Route>
              </Route>
              <Route path="/early" element={<EarlyFeature />} />
              <Route path="/u/*" element={<ProfileFeature />} />
            </Route>
            <Route path="*" element={<UiNotFound />} />
          </Route>
          <Route path="p/:pageId/*" element={<PageFeature />} />
        </Route>
        <Route element={<UiLayout />}>
          <Route path="*" element={<UiNotFound />} />
        </Route>
      </Routes>
    </UiThemeProvider>
  )
}

export function AppProviders() {
  return (
    <GraphQLProvider endpoint="/graphql">
      <ConfigProvider>
        <SolanaProvider>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </SolanaProvider>
      </ConfigProvider>
    </GraphQLProvider>
  )
}

export function PlaceholderComponent({ page }: { page: string }) {
  return (
    <Container>
      <Paper>TBD: {page}</Paper>
    </Container>
  )
}
