import { UiError, UiLoader } from '@pubkeyapp/web/ui/core'
import { Cluster, useConfigQuery } from '@pubkeyapp/web/util/sdk'
import { createContext, ReactNode, useContext } from 'react'

export interface ConfigProviderContext {
  apiUrl?: string | undefined
  cluster?: Cluster | undefined
  clusters: Cluster[]
}

const ConfigContext = createContext<ConfigProviderContext>({} as ConfigProviderContext)

function ConfigProvider({ children }: { children: ReactNode }) {
  const [{ data, fetching, error }] = useConfigQuery()

  const value: ConfigProviderContext = {
    apiUrl: data?.config?.api?.url,
    cluster: data?.config?.cluster,
    clusters: data?.config?.clusters || [],
  }

  if (fetching) {
    return <UiLoader type={'full'} />
  }
  if (error) {
    return <UiError error={error} />
  }

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

const useConfig = () => useContext(ConfigContext)

export { ConfigProvider, useConfig }
