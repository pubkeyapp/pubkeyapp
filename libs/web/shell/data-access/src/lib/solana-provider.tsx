import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { Cluster } from '@pubkeyapp/web/util/sdk'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { AnchorWallet, ConnectionProvider, useAnchorWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { GumAppProvider } from './gum-app-provider'
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
    const value = cluster?.endpoint ?? ''

    if (!value?.startsWith('http')) {
      const defaultUrl = clusterApiUrl(cluster?.id.toLowerCase() as WalletAdapterNetwork)
      console.warn(`Solana Provider endpoint invalid (${value}), using default: ${defaultUrl}`)
      return defaultUrl
    }

    return value
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
          <WalletModalProvider>
            <GumAppProvider>{children}</GumAppProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  )
}

export const useSolana = () => useContext(SolanaContext)
