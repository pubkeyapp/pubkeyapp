import { Group, Text } from '@mantine/core'
import { User } from '@pubkeyapp/sdk'

export function UserCounters({ user }: { user: User }) {
  return (
    <Group spacing={'xs'}>
      <UserCounter count={user?.followingCount} label={'Following'}></UserCounter>
      <UserCounter count={user?.followersCount} label={'Followers'}></UserCounter>
    </Group>
  )
}

export function UserCounter({ label, count = 0 }: { label: string; count?: number | null }) {
  return (
    <Group spacing={4}>
      <Text size="sm" weight="bold">
        {count}
      </Text>
      <Text size="sm" color="dimmed">
        {label}
      </Text>
    </Group>
  )
}
