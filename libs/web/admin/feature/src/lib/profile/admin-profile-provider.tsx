import { createContext, ReactNode, useContext, useState } from 'react'
import {
  AdminListProfileInput,
  AdminUpdateProfileInput,
  Profile,
  useAdminDeleteProfileMutation,
  useAdminProfilesQuery,
  useAdminUpdateProfileMutation,
} from '@pubkeyapp/web/util/sdk'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'

export interface AdminProfileProviderContext {
  profiles: Profile[]
  loading: boolean
  error: string | null
  deleteProfile: (profile: Profile) => Promise<boolean>
  updateProfile: (profile: Profile, input: AdminUpdateProfileInput) => Promise<boolean>

  refresh: () => void
}

const AdminProfileContext = createContext<AdminProfileProviderContext>({} as AdminProfileProviderContext)

function AdminProfileProvider({ children, ownerId }: { children: ReactNode; ownerId?: string | null }) {
  const [input] = useState<AdminListProfileInput>({ ownerId })
  const [{ data, error, fetching }, refresh] = useAdminProfilesQuery({ variables: { input } })
  const [, deleteProfileMutation] = useAdminDeleteProfileMutation()
  const [, updateProfileMutation] = useAdminUpdateProfileMutation()

  const deleteProfile = (profile: Profile): Promise<boolean> => {
    if (!window.confirm(`Are you sure you want to delete ${profile.type}?`)) {
      return Promise.resolve(false)
    }
    return deleteProfileMutation({ profileId: `${profile.id}` })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Profile ${profile.type} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updateProfile = async (profile: Profile, input: AdminUpdateProfileInput): Promise<boolean> => {
    return updateProfileMutation({
      profileId: `${profile.id}`,
      input: { ...input },
    })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Profile update')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const value = {
    profiles: data?.items ?? [],
    loading: fetching,
    error: error?.message ?? null,
    deleteProfile,
    updateProfile,
    refresh,
  }
  return <AdminProfileContext.Provider value={value}>{children}</AdminProfileContext.Provider>
}

const useAdminProfile = () => useContext(AdminProfileContext)

export { AdminProfileProvider, useAdminProfile }
