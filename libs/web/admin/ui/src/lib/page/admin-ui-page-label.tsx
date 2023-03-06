import { Group, Text } from '@mantine/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiPageLabel({ page }: { page: Page }) {
  const link = `/admin/pages/${page.id}`
  return (
    <Group spacing="sm" p={4} position="apart" align="center">
      <Text component={Link} to={link} size="xl" weight={500} color="brand">
        {page.title}
      </Text>
    </Group>
  )
}
