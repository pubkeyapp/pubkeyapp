import { createContext, ReactNode, useContext } from 'react'

export enum AppType {
  DialectInbox = 'dialect',
  GumProfile = 'gum',
  PubKeyPages = 'pages',
}

export interface App {
  id: AppType
  name: string
  itemId?: string
  logo: ReactNode
  soon?: boolean
}

export interface AppsProviderContext {
  apps: App[]
}

const AppsContext = createContext<AppsProviderContext>({} as AppsProviderContext)

export function AppsProvider({ apps, children }: { apps: App[]; children: ReactNode }) {
  const value: AppsProviderContext = {
    apps,
  }
  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>
}

export const useApps = () => useContext(AppsContext)
