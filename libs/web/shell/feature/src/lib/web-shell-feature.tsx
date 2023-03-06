import { UiProvider } from '@pubkeyapp/web/ui/core'
import { UiLayout } from '@pubkeyapp/web/ui/layout'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomepageFeature } from './homepage/homepage-feature'
import { LoginFeature } from './login/login-feature'
import { NotFoundFeature } from './not-found.feature'
import { SolanaProvider } from './solana-provider'

export function WebShellFeature() {
  return (
    <UiProvider>
      <SolanaProvider
        networks={[
          {
            id: WalletAdapterNetwork.Devnet,
            name: 'Devnet',
            endpoint: 'https://rpc-devnet.helius.xyz/?api-key=2a88ca2b-67c0-44c7-b2b6-1f7851af671f',
          },
          {
            id: WalletAdapterNetwork.Mainnet,
            name: 'Mainnet',
            endpoint: 'https://rpc.helius.xyz/?api-key=2a88ca2b-67c0-44c7-b2b6-1f7851af671f',
          },
        ]}
      >
        <Routes>
          <Route index element={<Navigate replace to={'/home'} />} />
          <Route element={<UiLayout hideHeader />}>
            <Route path="/home" element={<HomepageFeature />} />
          </Route>
          <Route element={<UiLayout />}>
            <Route path="/login" element={<LoginFeature />} />
            <Route path="/home" element={<HomepageFeature />} />
            <Route path="*" element={<NotFoundFeature />} />
          </Route>
        </Routes>
      </SolanaProvider>
    </UiProvider>
  )
}
