import { Anchor, Group, Text, useMantineTheme } from '@mantine/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiPageLink({ page }: { page: Page }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={`/admin/pages/${page?.id}`} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {page?.title}
        </Text>
      </Group>
    </Anchor>
  )
}
