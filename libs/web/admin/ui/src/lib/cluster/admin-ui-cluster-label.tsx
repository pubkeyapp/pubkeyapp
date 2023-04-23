import { Group, Text } from '@mantine/core'

import { Cluster } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiClusterLabel({ cluster }: { cluster: Cluster }) {
  const link = `/admin/clusters/${cluster.id}`
  return (
    <Group spacing="sm" p={4} position="apart" align="center">
      <Text component={Link} to={link} color="brand">
        {cluster.name}
      </Text>
    </Group>
  )
}
