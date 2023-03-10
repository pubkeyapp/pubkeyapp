import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import {
  AdminAddPageDomainInput,
  AdminCreatePageInput,
  AdminGetPagesInput,
  AdminUpdatePageInput,
  Page,
  useAdminAddPageDomainMutation,
  useAdminCreatePageMutation,
  useAdminDeletePageMutation,
  useAdminGetPagesQuery,
  useAdminUpdatePageMutation,
} from '@pubkeyapp/web/util/sdk'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface AdminPageProviderContext {
  pages: Page[]
  loading: boolean
  error: string | null
  addPageDomain: (page: Page, input: AdminAddPageDomainInput) => Promise<boolean>
  createItem: (input: AdminCreatePageInput) => Promise<Page | boolean>
  deletePage: (page: Page) => Promise<boolean>
  updatePage: (page: Page, input: AdminUpdatePageInput) => Promise<boolean>

  refresh: () => void
  slugify: (title: string) => string
}

const AdminPageContext = createContext<AdminPageProviderContext>({} as AdminPageProviderContext)

function AdminPageProvider({ children, ownerId }: { children: ReactNode; ownerId?: string | null }) {
  const [input] = useState<AdminGetPagesInput>({ ownerId })
  const [{ data, error, fetching }, refresh] = useAdminGetPagesQuery({ variables: { input } })
  const [, addPageDomainMutation] = useAdminAddPageDomainMutation()
  const [, createItemMutation] = useAdminCreatePageMutation()
  const [, deletePageMutation] = useAdminDeletePageMutation()
  const [, updatePageMutation] = useAdminUpdatePageMutation()

  const addPageDomain = async (page: Page, input: AdminAddPageDomainInput): Promise<boolean> => {
    return addPageDomainMutation({
      pageId: `${page.id}`,
      input: { ...input },
    })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Page Domain added')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const createItem = async (input: AdminCreatePageInput): Promise<Page | boolean> => {
    return createItemMutation({ input: { ...input } })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          showNotificationSuccess('Page created')
          return res.data.item
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const deletePage = (page: Page): Promise<boolean> => {
    if (!window.confirm(`Are you sure you want to delete ${page.title}?`)) {
      return Promise.resolve(false)
    }
    return deletePageMutation({ pageId: `${page.id}` })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Page ${page.title} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }
  const updatePage = async (page: Page, input: AdminUpdatePageInput): Promise<boolean> => {
    return updatePageMutation({
      pageId: `${page.id}`,
      input: { ...input },
    })
      .then((res) => {
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Page updated')
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  const value = {
    pages: data?.items ?? [],
    loading: fetching,
    error: error?.message ?? null,
    addPageDomain,
    createItem,
    deletePage,
    updatePage,
    refresh,
    slugify: (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'),
  }
  return <AdminPageContext.Provider value={value}>{children}</AdminPageContext.Provider>
}

const useAdminPage = () => useContext(AdminPageContext)

export { AdminPageProvider, useAdminPage }
