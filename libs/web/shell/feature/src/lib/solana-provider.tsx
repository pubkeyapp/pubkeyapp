import { useLocalStorage } from '@mantine/hooks'
import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { createContext, ReactNode, useContext, useMemo } from 'react'

export interface Network {
  id: WalletAdapterNetwork
  name: string
  endpoint: string
}

export interface SolanaProviderContext {
  network: Network
  networks: Network[]
  endpoint: string
  setNetwork: (network: Network) => void
}

const SolanaContext = createContext<SolanaProviderContext>({} as SolanaProviderContext)

export function SolanaProvider({ children, networks }: { children: ReactNode; networks: Network[] }) {
  const [network, setNetwork] = useLocalStorage<Network>({
    key: 'gum-playground-network',
    defaultValue: networks[0],
  })

  const endpoint = useMemo(() => {
    const found = networks.find((item) => item.id === network.id)
    return found ? found.endpoint : ''
  }, [network, networks])

  const wallets = useMemo(
    () => [
      // Add more wallets here
      new SolflareWalletAdapter({ network: network.id }),
      new PhantomWalletAdapter({ network: network.id }),
    ],
    [network.id],
  )

  const value: SolanaProviderContext = {
    endpoint,
    network,
    networks,
    setNetwork,
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
