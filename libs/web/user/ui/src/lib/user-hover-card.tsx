import { Badge, Group, Stack, Text } from '@mantine/core'
import { UserAvatarLink } from '@pubkeyapp/web/user/ui'
import { User } from '@pubkeyapp/sdk'
import { Link } from 'react-router-dom'
import { UserFollowButtons } from './user-follow-buttons'
import { UserCounters } from './user-counters'

export function UserHoverCard({ user }: { user: User }) {
  return (
    <Stack>
      <Group position="apart">
        <UserAvatarLink user={user} />
        {!(user as any).relation?.isYou ? (
          <UserFollowButtons username={`${user.username}`} relation={(user as any).relation} />
        ) : null}
      </Group>
      <Stack spacing={0}>
        <Text component={Link} to={`${user?.profileUrl}`} size="lg">
          {user?.name}
        </Text>
        <Group spacing="xs">
          <Text component={Link} to={`${user?.profileUrl}`} size="xs" color="dimmed">
            {user?.username}
          </Text>
          {(user as any).relation?.isFollowingYou ? (
            <Badge color="gray" size="xs">
              Follows you
            </Badge>
          ) : null}
        </Group>
      </Stack>
      {user.bio ? <Text>{user.bio}</Text> : null}
      <UserCounters user={user} />
    </Stack>
  )
}
