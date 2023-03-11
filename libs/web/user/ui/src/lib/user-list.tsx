import {
  Anchor,
  Avatar,
  createStyles,
  Group,
  Paper,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
  useMantineTheme,
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { User } from '@pubkeyapp/web/util/sdk'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}))

interface UserItemProps extends UnstyledButtonProps {
  user: User
}

export function UserList({ users }: { users: User[] }) {
  const theme = useMantineTheme()
  return (
    <Paper p={theme.spacing.xs} radius="md" withBorder>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </Paper>
  )
}

function UserListItem({ user, ...others }: UserItemProps) {
  const { classes } = useStyles()

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={user?.profile?.avatarUrl} radius="xl" />

        <div style={{ flex: 1 }}>
          <Anchor component={Link} to={`${user.profileUrl}`}>
            <Text size="sm" weight={500}>
              {user.username}
            </Text>
          </Anchor>

          <Text color="dimmed" size="xs">
            {user.role}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
}
