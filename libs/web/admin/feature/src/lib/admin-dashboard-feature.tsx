import { UiDashboardItem, UiDashboard } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'

export function AdminDashboardFeature({ links }: { links: UiDashboardItem[] }) {
  return (
    <UiPage>
      <UiDashboard links={links} />
    </UiPage>
  )
}
