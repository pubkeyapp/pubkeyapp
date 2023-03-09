import { Anchor, Group } from '@mantine/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import { IconPageBreak } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function AdminUiPageLabel({ page }: { page: Page }) {
  return (
    <Group spacing="sm" p={4} position="apart" align="center">
      <Group>
        <IconPageBreak size={32} />
        <Anchor component={Link} to={`/admin/pages/${page.id}`}>
          {page.id}
        </Anchor>
      </Group>
    </Group>
  )
}
