import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { GumLogo } from '@pubkeyapp/web/apps/ui'
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

export const apps: App[] = [
  { id: AppType.PubKeyPages, name: 'PubKey Page', logo: <PubKeyLogoRounded size={64} /> },
  { id: AppType.GumProfile, name: 'Gum Profile', logo: <GumLogo width={64} height={64} /> },
  { id: AppType.DialectInbox, name: 'Dialect Inbox', logo: <GumLogo width={64} height={64} />, soon: true },
]

export interface AppsProviderContext {
  apps: App[]
}

const AppsContext = createContext<AppsProviderContext>({} as AppsProviderContext)

export function AppsProvider({ children }: { children: ReactNode }) {
  const value: AppsProviderContext = {
    apps,
  }
  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>
}

export const useApps = () => useContext(AppsContext)
