import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { Cluster } from '@pubkeyapp/web/util/sdk'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useConfig } from './web-config.provider'

export interface SolanaProviderContext {
  cluster?: Cluster
  clusters: Cluster[]
  endpoint: string
}

const SolanaContext = createContext<SolanaProviderContext>({} as SolanaProviderContext)

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { cluster, clusters } = useConfig()

  const endpoint = useMemo(() => {
    return cluster?.endpoint ?? ''
  }, [cluster])

  const wallets = useMemo(
    () => [
      // Add more wallets here
      new SolflareWalletAdapter({ network: cluster?.id as WalletAdapterNetwork }),
      new PhantomWalletAdapter({ network: cluster?.id as WalletAdapterNetwork }),
    ],
    [cluster?.id],
  )

  const value: SolanaProviderContext = {
    endpoint,
    cluster,
    clusters,
  }

  return (
    <SolanaContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  )
}

export const useSolana = () => useContext(SolanaContext)
