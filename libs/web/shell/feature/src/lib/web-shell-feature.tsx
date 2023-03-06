import { UiProvider } from '@pubkeyapp/web/ui/core'
import { UiLayout } from '@pubkeyapp/web/ui/layout'
import { GraphQLProvider } from '@pubkeyapp/web/util/sdk'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { HomepageFeature } from './homepage/homepage-feature'
import { LoginFeature } from './login/login-feature'
import { NotFoundFeature } from './not-found.feature'
import { SolanaProvider } from './solana-provider'
import { ConfigProvider } from './web-config.provider'

export function WebShellFeature() {
  return (
    <UiProvider>
      <Routes>
        <Route index element={<Navigate replace to={'/home'} />} />
        <Route element={<UiLayout hideHeader />}>
          <Route path="/home" element={<HomepageFeature />} />
        </Route>
        <Route
          element={
            <GraphQLProvider endpoint="/graphql">
              <ConfigProvider>
                <SolanaProvider>
                  <Outlet />
                </SolanaProvider>
              </ConfigProvider>
            </GraphQLProvider>
          }
        >
          <Route element={<UiLayout />}>
            <Route path="/login" element={<LoginFeature />} />
            <Route path="/home" element={<HomepageFeature />} />
            <Route path="*" element={<NotFoundFeature />} />
          </Route>
        </Route>
      </Routes>
    </UiProvider>
  )
}
