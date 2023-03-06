import { Avatar, Badge, Button, Group, Paper, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { User } from '@pubkeyapp/sdk'
import { UserFollowButtons } from './user-follow-buttons'
import { UserCounters } from './user-counters'

export function UserHeader({ user }: { user: User }) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Group position="apart" align="start">
        <Group align="start">
          <Avatar src={user.avatarUrl} size={120} radius={120} />
          <Stack spacing="xs">
            <Text size="xl" weight="bold">
              {user.name}
            </Text>
            <Group spacing="xs" align="baseline">
              <Text component={Link} to={`${user?.profileUrl}`} size="md" color="dimmed">
                {user?.username}
              </Text>
              {(user as any).relation?.isFollowingYou ? (
                <Badge color="gray" size="xs">
                  Follows you
                </Badge>
              ) : null}
            </Group>
            {user.bio ? <Text>{user.bio}</Text> : null}
            <UserCounters user={user} />
          </Stack>
        </Group>

        <Group position="center" pt="md">
          <Stack spacing="xs">
            <Group position="right">
              {(user as any).relation?.isYou ? (
                <Button component={Link} to="/settings/profile" size="xs" variant="default">
                  Edit Profile
                </Button>
              ) : (
                <UserFollowButtons username={`${user.username}`} relation={(user as any).relation} />
              )}
            </Group>
          </Stack>
        </Group>
      </Group>
    </Paper>
  )
}
