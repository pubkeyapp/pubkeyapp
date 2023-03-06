import { Anchor, Group, Text, useMantineTheme } from '@mantine/core'
import { Domain } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiDomainLink({ domain }: { domain: Domain }) {
  const theme = useMantineTheme()
  return (
    <Anchor component={Link} to={`/admin/domains/${domain?.id}`} color={theme.colors.brand[4]}>
      <Group spacing={6}>
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {domain?.name}
        </Text>
      </Group>
    </Anchor>
  )
}
