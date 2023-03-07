import { Badge, Group, Text } from '@mantine/core'
import { PageTypeIcon } from '@pubkeyapp/web/page/ui'
import { Page, PageStatus, PageType } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiPageLabel({ page }: { page: Page }) {
  const link = `/admin/pages/${page.id}`
  return (
    <Group spacing="sm" p={4} position="apart" align="center">
      <Group>
        <PageTypeIcon type={page.type as PageType} size={24} />
        <Text component={Link} to={link} size="xl" weight={500} color="brand">
          {page.title}
        </Text>
      </Group>
      <Group>
        <Badge color={page.status === PageStatus.Published ? 'green' : 'brand'} variant="outline">
          {page.status}
        </Badge>
      </Group>
    </Group>
  )
}
