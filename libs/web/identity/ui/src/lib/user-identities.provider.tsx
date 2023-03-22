import { Identity, useUserGetIdentitiesQuery } from '@pubkeyapp/web/util/sdk'
import { createContext, ReactNode, useContext } from 'react'

export interface UserIdentitiesProviderContext {
  error?: unknown
  loading?: boolean
  refresh?: () => void
  items: Identity[]
}

const UserIdentitiesContext = createContext<UserIdentitiesProviderContext>({} as UserIdentitiesProviderContext)

export function UserIdentitiesProvider({ children }: { children: ReactNode }) {
  const [{ data, fetching, error }, refresh] = useUserGetIdentitiesQuery()
  const value: UserIdentitiesProviderContext = {
    error,
    loading: fetching,
    refresh,
    items: data?.items || [],
  }
  return <UserIdentitiesContext.Provider value={value}>{children}</UserIdentitiesContext.Provider>
}

export const useUserIdentities = () => useContext(UserIdentitiesContext)
