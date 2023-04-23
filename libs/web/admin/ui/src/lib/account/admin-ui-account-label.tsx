import { Group, Text } from '@mantine/core'
import { ellipsify } from '@pubkeyapp/web/ui/core'

import { Account } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'

export function AdminUiAccountLabel({ account }: { account: Account }) {
  const link = `/admin/accounts/${account.id}`
  return (
    <Group spacing="sm" p={4} position="apart" align="center">
      <Text component={Link} to={link} color="brand">
        {(account?.address?.length as number) > 30 ? ellipsify(`${account.address}`) : account?.address}
      </Text>
    </Group>
  )
}
