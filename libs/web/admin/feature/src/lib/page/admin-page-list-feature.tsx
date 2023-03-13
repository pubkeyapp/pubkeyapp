import { Alert } from '@mantine/core'
import { useAdminPage } from '@pubkeyapp/web/admin/data-access'
import { AdminUiPageTable } from '@pubkeyapp/web/admin/ui'
import { UiActionLink, UiDebugModal, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { IconCards, IconPlus } from '@tabler/icons-react'

export function AdminPageListFeature() {
  const { deletePage, error, pages, loading } = useAdminPage()

  return (
    <UiErrorLoader error={error} loading={loading}>
      <UiPage
        title="Pages"
        leftAction={<IconCards />}
        rightAction={<UiActionLink to="create" label="Create page" icon={<IconPlus size={16} stroke={1.5} />} />}
      >
        {pages?.length ? <AdminUiPageTable pages={pages} deletePage={deletePage} /> : <Alert>No pages found</Alert>}
      </UiPage>
      <UiDebugModal data={pages} />
    </UiErrorLoader>
  )
}
