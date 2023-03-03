import { Badge, useMantineTheme } from '@mantine/core'
import { USER_ROLE_COLORS, UserRole } from '../data-access/user.entity'

export function UserRoleBadge({ role }: { role: UserRole }) {
  const theme = useMantineTheme()
  return (
    <Badge color={USER_ROLE_COLORS[role]} variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
      {role}
    </Badge>
  )
}
