import { AppsProvider } from '@pubkeyapp/web/apps/data-access'
import { AuthGuard, AuthProvider, UserRoleGuard, UserStatusGuard } from '@pubkeyapp/web/auth/data-access'
import { ConfigProvider, SolanaProvider } from '@pubkeyapp/web/shell/data-access'
import { UiNotFound } from '@pubkeyapp/web/ui/core'
import { UiLayout } from '@pubkeyapp/web/ui/layout'
import { UiThemeProvider } from '@pubkeyapp/web/ui/theme'
import { GraphQLProvider, UserRole, UserStatus } from '@pubkeyapp/web/util/sdk'
import { lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AccountFeature } from './account/account-feature'
import { DashboardFeature } from './dashboard/dashboard-feature'
import { EarlyFeature } from './early/early-feature'
import { HomepageContentFeature, HomepageFeature } from './homepage/homepage-feature'
import { LoginFeature } from './login/login-feature'
import { PidRoutes } from './pid/pid.routes'
import { SearchFeature } from './search/search-feature'
import { VerifiedFeature } from './verified/verified-feature'

const AppsFeature = lazy(() => import('@pubkeyapp/web/apps/feature'))
const AdminFeature = lazy(() => import('@pubkeyapp/web/admin/feature'))
const DevFeature = lazy(() => import('@pubkeyapp/web/dev/feature'))
const ProfileFeature = lazy(() => import('@pubkeyapp/web/profile/feature'))
const PageFeature = lazy(() => import('@pubkeyapp/web/page/feature'))
const PageEditorFeature = lazy(() => import('@pubkeyapp/web/page-editor/feature'))
const PlanFeature = lazy(() => import('@pubkeyapp/web/plan/feature'))

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
  ]
  return (
    <UiThemeProvider>
      <Routes>
        <Route index element={<Navigate replace to={'/home'} />} />
        <Route element={<UiLayout homepage />}>
          <Route path="/home" element={<HomepageFeature />} />
          <Route path="/verified" element={<VerifiedFeature />} />
          {pages.map((page) => (
            <Route key={page} path={`${page}`} element={<HomepageContentFeature page={page} />} />
          ))}
        </Route>
        <Route element={<AppProviders />}>
          <Route element={<UiLayout />}>
            <Route path="/login" element={<LoginFeature />} />
            <Route element={<AuthGuard redirectTo="/login" />}>
              <Route
                element={
                  <AppsProvider>
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
              <Route path="/pid" element={<PidRoutes />} />
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
