import { Alert } from '@mantine/core'
import { useAdminDomain } from '@pubkeyapp/web/admin/data-access'
import { AdminUiDomainTable } from '@pubkeyapp/web/admin/ui'
import { UiActionLink, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { IconCards, IconPlus } from '@tabler/icons-react'

export function AdminDomainListFeature() {
  const { deleteDomain, error, domains, loading } = useAdminDomain()

  return (
    <UiErrorLoader error={error} loading={loading}>
      <UiPage
        title="Domains"
        leftAction={<IconCards />}
        rightAction={<UiActionLink to="create" label="Create domain" icon={<IconPlus size={16} stroke={1.5} />} />}
      >
        {domains?.length ? (
          <AdminUiDomainTable domains={domains} deleteDomain={deleteDomain} />
        ) : (
          <Alert>No domains found</Alert>
        )}
      </UiPage>
    </UiErrorLoader>
  )
}
