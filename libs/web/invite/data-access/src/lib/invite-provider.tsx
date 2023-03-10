import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import {
  AdminCreateInviteInput,
  AdminGetInvitesInput,
  AdminUpdateInviteInput,
  Invite,
  useAdminCreateInviteMutation,
  useAdminDeleteInviteMutation,
  useAdminGetInvitesQuery,
  useAdminUpdateInviteMutation,
} from '@pubkeyapp/web/util/sdk'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface AdminInviteProviderContext {
  invites: Invite[]
  loading: boolean
  error: string | null
  createItem: (input: AdminCreateInviteInput) => Promise<Invite | boolean>
  deleteInvite: (invite: Invite) => Promise<boolean>
  updateInvite: (invite: Invite, input: AdminUpdateInviteInput) => Promise<boolean>

  refresh: () => void
}

const AdminInviteContext = createContext<AdminInviteProviderContext>({} as AdminInviteProviderContext)

function AdminInviteProvider({ children, ownerId }: { children: ReactNode; ownerId?: string | null }) {
  const [input] = useState<AdminGetInvitesInput>({ ownerId })
  const [{ data, error, fetching }, refresh] = useAdminGetInvitesQuery({ variables: { input } })
  const [, createItemMutation] = useAdminCreateInviteMutation()
  const [, deleteInviteMutation] = useAdminDeleteInviteMutation()
  const [, updateInviteMutation] = useAdminUpdateInviteMutation()

  const createItem = async (input: AdminCreateInviteInput): Promise<Invite | boolean> => {
    return createItemMutation({ input: { ...input } })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Invite created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const deleteInvite = (invite: Invite): Promise<boolean> => {
    if (!window.confirm(`Are you sure you want to delete ${invite.code}?`)) {
      return Promise.resolve(false)
    }
    return deleteInviteMutation({ inviteId: `${invite.id}` })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Invite ${invite.code} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updateInvite = async (invite: Invite, input: AdminUpdateInviteInput): Promise<boolean> => {
    return updateInviteMutation({
      inviteId: `${invite.id}`,
      input: { ...input },
    })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Invite created')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const value = {
    invites: data?.items ?? [],
    loading: fetching,
    error: error?.message ?? null,
    createItem,
    deleteInvite,
    updateInvite,
    refresh,
  }
  return <AdminInviteContext.Provider value={value}>{children}</AdminInviteContext.Provider>
}

const useAdminInvite = () => useContext(AdminInviteContext)

export { AdminInviteProvider, useAdminInvite }
