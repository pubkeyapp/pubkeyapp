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
import { ProfileRoutes } from './profile/profile-routes'
import { SettingsFeature } from './settings/settings-feature'

const AdminFeature = lazy(() => import('@pubkeyapp/web/admin/feature'))
const DevFeature = lazy(() => import('@pubkeyapp/web/dev/feature'))
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
          {/*<Route path="/pricing" element={<PlanFeature />} />*/}
          {pages.map((page) => (
            <Route key={page} path={`${page}`} element={<HomepageContentFeature page={page} />} />
          ))}
        </Route>
        <Route element={<AppProviders />}>
          <Route element={<UiLayout />}>
            <Route path="/login" element={<LoginFeature />} />
            <Route element={<AuthGuard redirectTo="/login" />}>
              <Route element={<UserStatusGuard status={UserStatus.Active} element={<EarlyFeature />} />}>
                <Route path="/dashboard" element={<DashboardFeature />} />
                <Route path="/pages/*" element={<PageEditorFeature />} />
                <Route element={<UserRoleGuard role={UserRole.Admin} />}>
                  <Route path="/account/*" element={<AccountFeature />} />
                  <Route path="/admin/*" element={<AdminFeature />} />
                  <Route path="/dev/*" element={<DevFeature />} />
                </Route>
              </Route>
              <Route path="/early" element={<EarlyFeature />} />
              <Route path="/u/*" element={<ProfileRoutes />} />
              <Route path="/settings/*" element={<SettingsFeature />} />
              <Route path="/profile/identities/*" element={<div>TBD: Profile Identities Page</div>} />
              <Route path="/intent/connect/*" element={<div>TBD: Connect Identity Page</div>} />
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
