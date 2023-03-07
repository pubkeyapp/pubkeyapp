import { Badge, useMantineTheme } from '@mantine/core'
import { UserRole, UserStatus } from '@pubkeyapp/web/util/sdk'

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  [UserStatus.Active]: 'green',
  [UserStatus.Created]: 'blue',
  [UserStatus.Inactive]: 'gray',
}

export const USER_ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.Admin]: 'pink',
  [UserRole.User]: 'blue',
}

export function UserRoleBadge({ role }: { role: UserRole }) {
  const theme = useMantineTheme()
  return (
    <Badge color={USER_ROLE_COLORS[role]} variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
      {role}
    </Badge>
  )
}
