import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'
import {
  AdminCreateDomainInput,
  AdminGetDomainsInput,
  AdminUpdateDomainInput,
  Domain,
  useAdminCreateDomainMutation,
  useAdminDeleteDomainMutation,
  useAdminGetDomainsQuery,
  useAdminUpdateDomainMutation,
} from '@pubkeyapp/web/util/sdk'
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

export interface DomainOption {
  label: string
  value: string
}

export interface AdminDomainProviderContext {
  domains: Domain[]
  domainOptions: DomainOption[]
  loading: boolean
  error: string | null
  createItem: (input: AdminCreateDomainInput) => Promise<Domain | boolean>
  deleteDomain: (domain: Domain) => Promise<boolean>
  updateDomain: (domain: Domain, input: AdminUpdateDomainInput) => Promise<boolean>

  refresh: () => void
}

const AdminDomainContext = createContext<AdminDomainProviderContext>({} as AdminDomainProviderContext)

function AdminDomainProvider({ children, ownerId }: { children: ReactNode; ownerId?: string | null }) {
  const [input] = useState<AdminGetDomainsInput>({ ownerId })
  const [{ data, error, fetching }, refresh] = useAdminGetDomainsQuery({ variables: { input } })
  const [, createItemMutation] = useAdminCreateDomainMutation()
  const [, deleteDomainMutation] = useAdminDeleteDomainMutation()
  const [, updateDomainMutation] = useAdminUpdateDomainMutation()

  const domains = useMemo(() => data?.items ?? [], [data?.items])

  const domainOptions: DomainOption[] = useMemo(
    () =>
      domains?.map((domain) => ({
        label: `${domain.name} - (${domain.premium ? 'Premium' : 'Free'})  (${domain.private ? 'Private' : 'Public'}) `,
        value: domain.id ?? '',
      })) ?? [],
    [domains],
  )
  const createItem = async (input: AdminCreateDomainInput): Promise<Domain | boolean> => {
    return createItemMutation({ input: { ...input } })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Domain created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const deleteDomain = (domain: Domain): Promise<boolean> => {
    if (!window.confirm(`Are you sure you want to delete ${domain.name}?`)) {
      return Promise.resolve(false)
    }
    return deleteDomainMutation({ domainId: `${domain.id}` })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Domain ${domain.name} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updateDomain = async (domain: Domain, input: AdminUpdateDomainInput): Promise<boolean> => {
    return updateDomainMutation({
      domainId: `${domain.id}`,
      input: { ...input },
    })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Domain created')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const value = {
    domains,
    domainOptions,
    loading: fetching,
    error: error?.message ?? null,
    createItem,
    deleteDomain,
    updateDomain,
    refresh,
  }
  return <AdminDomainContext.Provider value={value}>{children}</AdminDomainContext.Provider>
}

const useAdminDomain = () => useContext(AdminDomainContext)

export { AdminDomainProvider, useAdminDomain }
