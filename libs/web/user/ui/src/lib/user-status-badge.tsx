import { Badge, useMantineTheme } from '@mantine/core'
import { UserStatus } from '@pubkeyapp/web/util/sdk'
import { USER_STATUS_COLORS } from './user-role-badge'

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const theme = useMantineTheme()
  return (
    <Badge color={USER_STATUS_COLORS[status]} variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
      {status}
    </Badge>
  )
}
