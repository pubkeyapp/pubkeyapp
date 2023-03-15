import { PageBlockEditor } from '@pubkeyapp/web/page/ui'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { AdminAddPageBlockInput, Page, useAdminAddPageBlockMutation } from '@pubkeyapp/web/util/sdk'

export function AdminUiBlockAddForm({ page }: { page: Page }) {
  const [, addPageBlockMutation] = useAdminAddPageBlockMutation()
  const addPageBlock = async (input: AdminAddPageBlockInput): Promise<boolean> => {
    return addPageBlockMutation({ pageId: page.id!, input })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Block added`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  return <PageBlockEditor submit={(input) => addPageBlock({ ...input, order: (page?.blocks?.length ?? 0) + 1 })} />
}
