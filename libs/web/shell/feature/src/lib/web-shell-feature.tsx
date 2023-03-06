import { AuthGuard, AuthProvider } from '@pubkeyapp/web/auth/data-access'
import { ConfigProvider, SolanaProvider } from '@pubkeyapp/web/shell/data-access'
import { UiProvider } from '@pubkeyapp/web/ui/core'
import { UiLayout } from '@pubkeyapp/web/ui/layout'
import { GraphQLProvider } from '@pubkeyapp/web/util/sdk'
import { lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { DashboardFeature } from './dashboard/dashboard-feature'
import { HomepageContentFeature, HomepageFeature } from './homepage/homepage-feature'
import { LoginFeature } from './login/login-feature'
import { NotFoundFeature } from './not-found.feature'

const AdminFeature = lazy(() => import('@pubkeyapp/web/admin/feature'))
const PageFeature = lazy(() => import('@pubkeyapp/web/page/feature'))

export function WebShellFeature() {
  const pages = ['/learn', '/docs', '/resources', '/sdk', '/support', '/pricing', '/about']
  return (
    <UiProvider>
      <Routes>
        <Route index element={<Navigate replace to={'/home'} />} />
        <Route element={<UiLayout homepage />}>
          <Route path="/home" element={<HomepageFeature />} />
          {pages.map((page) => (
            <Route key={page} path={`/${page}`} element={<HomepageContentFeature page={page} />} />
          ))}
        </Route>
        <Route element={<AppProviders />}>
          <Route element={<UiLayout />}>
            <Route path="/login" element={<LoginFeature />} />
            <Route element={<AuthGuard redirectTo="/login" />}>
              <Route path="/admin/*" element={<AdminFeature />} />
              <Route path="/dashboard" element={<DashboardFeature />} />
              <Route path="/profile/identities/*" element={<div>TBD: Profile Identities Page</div>} />
              <Route path="/intent/connect/*" element={<div>TBD: Connect Identity Page</div>} />
            </Route>
            <Route path="*" element={<NotFoundFeature />} />
          </Route>
          <Route path="p/:pageId/*" element={<PageFeature />} />
        </Route>
        <Route element={<UiLayout />}>
          <Route path="*" element={<NotFoundFeature />} />
        </Route>
      </Routes>
    </UiProvider>
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
