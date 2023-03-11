import { Profile, useUserGetProfilesQuery } from '@pubkeyapp/web/util/sdk'
import { createContext, ReactNode, useContext } from 'react'

export interface UserProfilesProviderContext {
  error?: any
  loading: boolean
  refresh: () => void
  items: Profile[]
}

const UserProfilesContext = createContext<UserProfilesProviderContext>({} as UserProfilesProviderContext)

export function UserProfilesProvider({ children }: { children: ReactNode }) {
  const [{ data, fetching, error }, refresh] = useUserGetProfilesQuery()
  const value: UserProfilesProviderContext = {
    error,
    loading: fetching,
    refresh,
    items: data?.items || [],
  }
  return <UserProfilesContext.Provider value={value}>{children}</UserProfilesContext.Provider>
}

export const useUserProfiles = () => useContext(UserProfilesContext)
