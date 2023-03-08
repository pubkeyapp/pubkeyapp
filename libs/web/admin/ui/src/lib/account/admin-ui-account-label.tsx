import { Group, Text } from '@mantine/core'

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

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}
