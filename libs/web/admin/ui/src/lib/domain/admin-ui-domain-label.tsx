import { Badge, Group, Text } from '@mantine/core'
import { Domain } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiDomainLabel({ domain }: { domain: Domain }) {
  const link = `/admin/domains/${domain.id}`
  return (
    <Group spacing="sm" p={4} position="apart" align="center">
      <Text component={Link} to={link} size="xl" weight={500} color="brand">
        {domain.name}
      </Text>
      <Group spacing="sm">
        <Badge size="sm" color={domain.premium ? 'green' : 'gray'}>
          {domain.premium ? 'Premium' : 'Free'}
        </Badge>
        <Badge size="sm" color={domain.private ? 'orange' : 'green'}>
          {domain.private ? 'Private' : 'Public'}
        </Badge>
      </Group>
    </Group>
  )
}
