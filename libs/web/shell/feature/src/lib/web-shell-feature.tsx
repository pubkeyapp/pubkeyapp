import { AuthGuard, AuthProvider } from '@pubkeyapp/web/auth/data-access'
import { ConfigProvider, SolanaProvider } from '@pubkeyapp/web/shell/data-access'
import { UiProvider } from '@pubkeyapp/web/ui/core'
import { UiLayout } from '@pubkeyapp/web/ui/layout'
import { GraphQLProvider } from '@pubkeyapp/web/util/sdk'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { DashboardFeature } from './dashboard/dashboard-feature'
import { HomepageFeature } from './homepage/homepage-feature'
import { LoginFeature } from './login/login-feature'
import { NotFoundFeature } from './not-found.feature'

export function WebShellFeature() {
  return (
    <UiProvider>
      <Routes>
        <Route index element={<Navigate replace to={'/home'} />} />
        <Route element={<UiLayout hideHeader />}>
          <Route path="/home" element={<HomepageFeature />} />
        </Route>
        <Route element={<AppProviders />}>
          <Route element={<UiLayout />}>
            <Route path="/login" element={<LoginFeature />} />
            <Route element={<AuthGuard redirectTo="/login" />}>
              <Route path="/dashboard" element={<DashboardFeature />} />
            </Route>
          </Route>
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
