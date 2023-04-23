import { Group, Text } from '@mantine/core'
import { ellipsify } from '@pubkeyapp/web/ui/core'

import { Collection } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiCollectionLabel({ collection }: { collection: Collection }) {
  const link = `/admin/collections/${collection.id}`
  return (
    <Group spacing="sm" p={4} position="apart" align="center">
      <Text component={Link} to={link} color="brand">
        {(collection?.address?.length as number) > 30 ? ellipsify(`${collection.address}`) : collection?.address}
      </Text>
    </Group>
  )
}
