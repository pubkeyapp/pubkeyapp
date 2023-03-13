import { ActionIcon, Box, Group } from '@mantine/core'
import { AdminUiExternalLink } from '@pubkeyapp/web/admin/ui'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { Page, PageDomain, useAdminRemovePageDomainMutation } from '@pubkeyapp/web/util/sdk'
import { IconGlobe, IconTrash } from '@tabler/icons-react'
import React from 'react'

export function AdminPageDomainList({ page }: { page: Page }) {
  const [, removePageDomainMutation] = useAdminRemovePageDomainMutation()
  const removePageDomain = (domain: PageDomain) => {
    removePageDomainMutation({ pageId: page.id!, pageDomainId: domain.id! })
      .then((result) => {
        if (result.error) {
          return showNotificationError(result.error.message)
        }
        if (result.data?.item) {
          return showNotificationSuccess(`Page Domain ${domain.viewUrl} deleted`)
        }
        return false
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <Box>
      {page?.domains?.map((domain) => (
        <Box key={domain.id}>
          <Group position="apart">
            <Group spacing={4}>
              <IconGlobe size={16} />
              <AdminUiExternalLink key={domain.id} link={domain.viewUrl!} />
            </Group>
            <Group spacing={0} position="right" noWrap>
              <ActionIcon color="red" onClick={() => removePageDomain(domain)}>
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>
        </Box>
      ))}
    </Box>
  )
}
